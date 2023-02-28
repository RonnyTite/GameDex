<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="app-header">
        <IonTitle
          class="font__pixel ion-text-uppercase"
          color="light"
        >
          Library
        </IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon
              :icon="filterOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <ion-toolbar>
        <Searchbar
          :debounce="200"
          @on-search="search($event)"
          @clear="resetSearch"
        />
      </ion-toolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense" />

      <IonSpinner
        v-if="processing"
        name="crescent"
        class="spinner"
      />
      <DisplayAsList
        v-else
        :data-list="filteredLibrary"
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
import { filterOutline } from 'ionicons/icons';
import Searchbar from '../components/SearchBar.vue';
import GameCard from '../components/GameCard.vue';
import DisplayAsList from '../components/DisplayAsList.vue';
import Utils from '../utils/Utils';
import { GameProfile } from '../types/searchEntities.d';

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
    return { filterOutline };
  },
  data() {
    return {
      library: [] as Array<GameProfile>,
      filteredLibrary: [] as Array<GameProfile>,
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
    };
  },
  beforeMount() {
    this.library = Utils.loadLibraryFromStore();
    this.resetSearch();
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
        this.filteredLibrary = this.library.filter(
          (game) => game.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        );
      } else if (searchValue === '') {
        this.resetSearch();
      }
    },
    resetSearch(): void {
      this.filteredLibrary = [...this.library];
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
