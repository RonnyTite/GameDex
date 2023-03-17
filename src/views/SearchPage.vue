<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="app-header">
        <IonTitle
          class="font__pixel ion-text-uppercase"
          color="light"
        >
          Search
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
import Searchbar from '@/components/SearchBar.vue';
import GameCard from '@/components/GameCard.vue';
import DisplayAsList from '@/components/DisplayAsList.vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import { GameProfile } from '@/types/searchEntities';
import GiantBombApi from '@/scripts/GiantBombApi';

export default defineComponent({
  components: {
    GameCard,
    Searchbar,
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
  },
  setup() {
    return { listOutline };
  },
  data() {
    return {
      results: [] as Array<GameProfile>,
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
      this.modalGameId = '';
      this.isGameCardModalOpen = false;
    },
    search(searchValue: SearchbarChangeEventDetail['value']): void {
      if (searchValue) {
        this.processing = true;
        GiantBombApi.makeSearch(searchValue)
          .then((searchResults) => {
            this.results = searchResults.data.results;
            this.processing = false;
          })
          .catch(() => {
            // !!Debug Mode
            this.results = searchMockJson.results as Array<GameProfile>;
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
