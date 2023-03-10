<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="app-header">
        <IonTitle
          class="font__pixel ion-text-uppercase"
          color="light"
        >
          GameDex
        </IonTitle>
        <IonButtons slot="end">
          <PlatformsFilter
            v-if="originalFeedResponse.length> 0"
            key="HomepageFilter"
            :data-list="originalFeedResponse"
            @on-filter="filteringByPlatforms"
          />
          <IonButton @click="changeListDisplay">
            <IonIcon
              v-if="listAs === 'masonry'"
              :icon="listOutline"
              color="light"
            />
            <IonIcon
              v-else
              :icon="gridOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent
      :fullscreen="true"
      class="ion-margin-horizontal"
    >
      <IonHeader collapse="condense" />
      <IonRefresher
        slot="fixed"
        @ion-refresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>
      <div
        v-if="dayfilteredFeed.length> 0"
        class="today-releases-container ion-margin-top"
      >
        <div class="title text__bold text__black ion-text-uppercase ion-margin-start">
          Today Releases
          <HomePageSlider
            :data-list="dayfilteredFeed"
            class="ion-margin-vertical"
            @open-gamecard="openGameCard"
          />
        </div>
      </div>
      <div class="future-release-container ion-margin-top">
        <div class="title text__bold text__black ion-text-uppercase ion-margin-vertical ion-margin-start">
          Future Releases
        </div>
        <IonSpinner
          v-if="processing"
          name="crescent"
          class="spinner"
        />
        <div v-else>
          <DisplayAsList
            v-if="listAs === 'list'"
            :data-list="homePageFeed"
            @open-gamecard="openGameCard"
          />
          <DisplayAsMasonry
            v-else
            :data-list="homePageFeed"
            @open-gamecard="openGameCard"
          />
        </div>
      </div>

      <GameCard
        v-if="isGameCardModalOpen"
        :is-open="isGameCardModalOpen"
        :game-id="modalGameId"
        @close-modal="closeGameCard"
      />
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSpinner, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RefresherEventDetail } from '@ionic/core';
import { listOutline, gridOutline, filterOutline } from 'ionicons/icons';
import GameCard from '../components/GameCard.vue';
import PlatformsFilter from '../components/PlatformsFilter.vue';
import DisplayAsList from '../components/DisplayAsList.vue';
import HomePageSlider from '../components/HomePageSlider.vue';
import DisplayAsMasonry from '../components/DisplayAsMasonry.vue';
import searchMockJson from '../mocks/searchRequestResultsMock.json';
import { GamePlatform, GameProfileFeed } from '../types/searchEntities.d';
import GiantBombApi from '../scripts/GiantBombApi';
import Utils from '../utils/Utils';

type ListDisplays = 'list' | 'masonry';

export default defineComponent({
  components: {
    PlatformsFilter,
    GameCard,
    HomePageSlider,
    DisplayAsList,
    DisplayAsMasonry,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonButtons,
    IonButton,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    return { listOutline, gridOutline, filterOutline };
  },
  data() {
    return {
      homePageFeed: [] as Array<GameProfileFeed>,
      originalFeedResponse: [] as Array<GameProfileFeed>,
      dayfilteredFeed: [] as Array<GameProfileFeed>,
      popoverOpen: false as boolean,
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
      listAs: 'masonry' as ListDisplays,
      appColor: {
        blue: '#1f6cf8',
        green: '#1cf069',
        spacer: '#ececec',
        red: '#f25a41',
      },
    };
  },
  computed: {

  },
  beforeMount() {
    this.loadFeed();
  },
  methods: {
    changeListDisplay() {
      let newDisplay:ListDisplays = 'list';
      if (this.listAs === 'list') {
        newDisplay = 'masonry';
      } else if (this.listAs === 'masonry') {
        newDisplay = 'list';
      }

      this.listAs = newDisplay;
    },
    openGameCard(game:GameProfileFeed) {
      this.modalGameId = game.id.toString();
      this.isGameCardModalOpen = true;
    },
    closeGameCard() {
      this.modalGameId = '';
      this.isGameCardModalOpen = false;
    },
    handleRefresh(event:{ target: RefresherEventDetail }): void {
      this.loadFeed()
        .then(() => {
          setTimeout(() => {
            event.target.complete();
          }, 2000);
        });
    },
    filteringBlankDateFromFeedResults(data:Array<GameProfileFeed>) {
      return data.filter((item:GameProfileFeed) => {
        const isDayExists = item.expected_release_day !== null;
        const isMonthExists = item.expected_release_month !== null;
        const isYearExists = item.expected_release_year !== null;
        const isReleaseDateExists = item.original_release_date !== null;

        return isReleaseDateExists || (isDayExists && isMonthExists && isYearExists);
      });
    },
    filteringTodayDateFromFeedResults(data:Array<GameProfileFeed>) {
      return data.filter((item:GameProfileFeed) => {
        const gameDate = Utils.computeReleaseDate(item);
        const { fullDate } = Utils.computeTodayDate();
        return gameDate === fullDate;
      });
    },
    removingTodayDateFromFeedResults(data:Array<GameProfileFeed>) {
      return data.filter((item:GameProfileFeed) => {
        const gameDate = Utils.computeReleaseDate(item);
        const { fullDate } = Utils.computeTodayDate();
        return gameDate !== fullDate;
      });
    },
    filteringByPlatforms(platformNames:Array<GamePlatform['name']>):void {
      // eslint-disable-next-line max-len
      let filtered:Array<GameProfileFeed>;

      if (platformNames.length > 0) {
        // eslint-disable-next-line max-len
        filtered = this.originalFeedResponse.filter((game) => game.platforms.find((platform) => platformNames.includes(platform.name)));
      } else {
        filtered = this.originalFeedResponse;
      }

      this.homePageFeed = filtered;
    },
    loadFeed() {
      return GiantBombApi.loadHomePageFeed()
        .then((feedResults) => {
          const filteredResults = this.filteringBlankDateFromFeedResults(feedResults.data.results);
          this.dayfilteredFeed = this.filteringTodayDateFromFeedResults(filteredResults);
          this.homePageFeed = this.removingTodayDateFromFeedResults(filteredResults);
          this.originalFeedResponse = this.removingTodayDateFromFeedResults(filteredResults);
        })
        .catch(() => {
          // !!Debug Mode
          this.homePageFeed = searchMockJson.results as Array<GameProfileFeed>;
          this.originalFeedResponse = searchMockJson.results as Array<GameProfileFeed>;
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
});
</script>
<style>
 /* https://webdevetc.com/programming-tricks/vue3/vue3-guides/vue-3-global-scss-sass-variables/ */
.today-releases-container {
  height: 500px;
  width: 100%;
}
.future-release-container {
  height: auto;
}
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
ion-toolbar {
    --background: #1f6cf8;
}
ion-popover {
  --max-height: 330px
}

</style>
