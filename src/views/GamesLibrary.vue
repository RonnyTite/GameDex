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
          <PlatformsFilter
            v-if="rawLibrary.length> 0"
            :data-list="rawLibrary"
            @on-filter="registerFilterEvent"
          />
        </IonButtons>
      </IonToolbar>
      <ion-toolbar>
        <Searchbar
          :debounce="200"
          @on-search="registerSearchEvent($event)"
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
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
  IonSpinner, IonButtons,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
import { filterOutline } from 'ionicons/icons';
import Searchbar from '../components/SearchBar.vue';
import GameCard from '../components/GameCard.vue';
import DisplayAsList from '../components/DisplayAsList.vue';
import PlatformsFilter from '../components/PlatformsFilter.vue';
import Utils from '../utils/Utils';
import { GameProfile, GamePlatform } from '../types/searchEntities.d';

export default defineComponent({
  components: {
    GameCard,
    Searchbar,
    PlatformsFilter,
    DisplayAsList,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonButtons,
  },
  setup() {
    return { filterOutline };
  },
  data() {
    return {
      rawLibrary: [] as Array<GameProfile>,
      library: [] as Array<GameProfile>,
      filteredLibrary: [] as Array<GameProfile>,
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
      searchedValue: '' as string,
      platforms: [] as Array<GamePlatform['name']>,
    };
  },
  beforeMount() {
    this.rawLibrary = Utils.loadLibraryFromStore();
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
    registerSearchEvent(searchValue: SearchbarChangeEventDetail['value']):void {
      this.searchedValue = searchValue || '';
      this.searchAndFilter();
    },
    registerFilterEvent(platformNames:Array<GamePlatform['name']>):void {
      debugger;
      this.platforms = platformNames;
      this.searchAndFilter();
    },
    search(searchValue:string): Array<GameProfile> {
      let searched = [] as Array<GameProfile>;
      if (searchValue) {
        searched = this.filteredLibrary.filter(
          (game) => game.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        );
      } else if (searchValue === '') {
        searched = this.rawLibrary;
      } else {
        searched = [] as Array<GameProfile>;
      }
      return searched;
    },
    filteringByPlatforms(platformNames:Array<GamePlatform['name']>):Array<GameProfile> {
      let filtered:Array<GameProfile>;

      if (this.platforms.length > 0) {
        // eslint-disable-next-line max-len
        filtered = this.filteredLibrary.filter((game) => game.platforms.find((platform) => platformNames.includes(platform.name)));
      } else {
        filtered = this.filteredLibrary;
      }

      return filtered;
    },
    searchAndFilter():void {
      this.resetSearch();

      if (this.searchedValue) {
        this.filteredLibrary = this.search(this.searchedValue);
      }

      if (this.platforms) {
        this.filteredLibrary = this.filteringByPlatforms(this.platforms);
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
