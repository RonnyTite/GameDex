<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon
              :icon="listOutline"
              color="primary"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense" />
      <Searchbar
        @on-search="search($event)"
        @clear="clear"
      />

      <IonSpinner
        v-if="processing"
        name="crescent"
        class="mx-auto spinner"
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
  IonSpinner, IonButtons, IonButton, IonIcon,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
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
  },
  setup() {
    return { listOutline };
  },
  data() {
    return {
      results: [] as SearchResults['results'],
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
    };
  },
  methods: {
    openGameCard(game:GameProfile) {
      this.modalGameId = game.id.toString();
      this.isGameCardModalOpen = true;
    },
    closeGameCard() {
      debugger;
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
  },
});
</script>
<style>
.spinner {
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
}
</style>
