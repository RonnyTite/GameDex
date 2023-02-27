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
      <ion-toolbar>
        <Searchbar
          @on-search="search($event)"
          @clear="clear"
        />
      </ion-toolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense" />
      <IonRefresher
        slot="fixed"
        @ion-refresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>
      <IonSpinner
        v-if="processing"
        name="crescent"
        class="spinner"
      />
      <DisplayAsList
        v-else
        :data-list="results"
        @open-gamecard="openGameCard"
      />

      <!-- <ExploreContainer name="Home page" /> -->
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
import { SearchbarChangeEventDetail, RefresherEventDetail } from '@ionic/core';
import { listOutline } from 'ionicons/icons';
import Searchbar from '../components/SearchBar.vue';
import GameCard from '../components/GameCard.vue';
import DisplayAsList from '../components/DisplayAsList.vue';
// import ExploreContainer from '../components/ExploreContainer.vue';
import searchMockJson from '../mocks/searchRequestResultsMock.json';
import { GameProfile, SearchResults } from '../types/searchEntities.d';
import GiantBombApi from '../scripts/GiantBombApi';

export default defineComponent({
  components: {
    GameCard,
    Searchbar,
    DisplayAsList,
    // ExploreContainer,
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
      results: [] as SearchResults['results'],
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
  methods: {
    openGameCard(game:GameProfile) {
      this.modalGameId = game.id.toString();
      this.isGameCardModalOpen = true;
    },
    closeGameCard() {
      this.modalGameId = '';
      this.isGameCardModalOpen = false;
    },
    search(searchValue: SearchbarChangeEventDetail['value']): void {
      this.processing = true;
      if (searchValue) {
        GiantBombApi.makeSearch(searchValue)
          .then((searchResults) => {
            this.results = searchResults.data.results;
            this.processing = false;
          })
          .catch(() => {
            // !!Debug Mode
            this.results = searchMockJson.results as SearchResults['results'];
          })
          .finally(() => {
            this.processing = false;
          });
      }
    },
    clear(): void {
      this.results = [];
    },
    handleRefresh(event:{ target: RefresherEventDetail }): void {
      GiantBombApi.loadHomePageFeed()
        .then((feedResults:any) => {
          this.homePageFeed = feedResults.data.results;
        })
        .catch(() => {
          // !!Debug Mode
          this.homePageFeed = searchMockJson.results as SearchResults['results'];
        })
        .finally(() => {
          setTimeout(() => {
            this.processing = false;
            event.target.complete();
          }, 2000);
        });
    },
  },
});
</script>
<style>

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
