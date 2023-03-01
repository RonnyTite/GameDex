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
          <IonButton>
            <IonIcon
              :icon="listOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense" />
      <IonRefresher
        slot="fixed"
        @ion-refresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>
      <div class="today-releases-container">
        <div class="title text__bold text__black ion-text-uppercase ion-margin-start ion-margin-top ">
          Today Releases
        </div>
      </div>
      <div class="future-release-container">
        <div class="title text__bold text__black ion-text-uppercase ion-margin-start">
          Future Releases
        </div>
        <IonSpinner
          v-if="processing"
          name="crescent"
          class="spinner"
        />
        <DisplayAsList
          v-else
          :data-list="homePageFeed"
          @open-gamecard="openGameCard"
        />
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
import { listOutline } from 'ionicons/icons';
import GameCard from '../components/GameCard.vue';
import DisplayAsList from '../components/DisplayAsList.vue';
import searchMockJson from '../mocks/searchRequestResultsMock.json';
import { GameProfileFeed } from '../types/searchEntities.d';
import GiantBombApi from '../scripts/GiantBombApi';

export default defineComponent({
  components: {
    GameCard,
    DisplayAsList,
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
    return { listOutline };
  },
  data() {
    return {
      results: [] as Array<GameProfileFeed>,
      homePageFeed: [] as any,
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
      appColor: {
        blue: '#1f6cf8',
        green: '#1cf069',
        spacer: '#ececec',
        red: '#f25a41',
      },
    };
  },
  beforeMount() {
    this.loadFeed();
  },
  methods: {
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
    filteringFeedResults(data:Array<GameProfileFeed>) {
      return data.filter((item:GameProfileFeed) => {
        const isDayExists = item.expected_release_day !== null;
        const isMonthExists = item.expected_release_month !== null;
        const isYearExists = item.expected_release_year !== null;
        const isReleaseDateExists = item.original_release_date !== null;

        return isReleaseDateExists || (isDayExists && isMonthExists && isYearExists);
      });
    },
    loadFeed() {
      return GiantBombApi.loadHomePageFeed()
        .then((feedResults) => {
          this.homePageFeed = this.filteringFeedResults(feedResults.data.results);
        })
        .catch(() => {
          // !!Debug Mode
          this.homePageFeed = searchMockJson.results as Array<GameProfileFeed>;
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
  height: 230px;
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

</style>
