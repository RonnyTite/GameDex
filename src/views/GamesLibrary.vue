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
            v-if="flatGameLibrary.length> 0"
            :data-list="flatGameLibrary"
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
      <div
        v-for="([letter,gamesListFilteredByLetter], index) in Object.entries(filteredLibrary)"
        :key="index"
      >
        <h4>{{ letter.toUpperCase() }}</h4>
        <DisplayAsList
          :data-list="gamesListFilteredByLetter"
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
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
  IonButtons,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
import { filterOutline } from 'ionicons/icons';
import gameDexStore from '@/store/Store';
import Searchbar from '@/components/SearchBar.vue';
import GameCard from '@/components/GameCard.vue';
import DisplayAsList from '@/components/DisplayAsList.vue';
import PlatformsFilter from '@/components/PlatformsFilter.vue';
import Utils from '@/utils/Utils';
import { CompleteGameProfile, GameProfile, GamePlatform } from '@/types/searchEntities';
import { SortedLibrary, GameLibrary } from '@/types/Store.d';

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
    IonButtons,
  },
  setup() {
    return { filterOutline };
  },
  data() {
    return {
      rawLibrary: {} as GameLibrary,
      library: {} as SortedLibrary,
      filteredLibrary: {} as SortedLibrary,
      processing: false as boolean,
      isGameCardModalOpen: false as boolean,
      modalGameId: '' as string,
      searchedValue: '' as string,
      platforms: [] as Array<GamePlatform['name']>,
    };
  },
  computed: {
    flatGameLibrary():Array<CompleteGameProfile> {
      return Utils.flatGameLibrary(this.rawLibrary);
    },
  },
  ionViewDidEnter() {
    this.initPage();
  },
  methods: {
    initPage() {
      const store = gameDexStore();
      const library:SortedLibrary = Utils.loadLibrary();
      this.rawLibrary = { ...store.gameLibrary };
      this.library = library;
      console.debug(' this.library', this.library);
      this.filteredLibrary = library;
      this.resetSearch();
    },
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
      this.platforms = platformNames;
      this.searchAndFilter();
    },
    search(searchValue:string): SortedLibrary {
      let searched = {} as SortedLibrary;
      if (searchValue) {
        const flattenedList = Utils.flatGameLibrary(this.filteredLibrary);
        const filteredList = flattenedList.filter(
          (game) => game.name.toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()),
        );
        searched = Utils.organizeFlattenedLibraryAsGameLibrary(filteredList);
      } else if (searchValue === '') {
        searched = this.filteredLibrary;
      }

      return searched;
    },
    filteringByPlatforms(platformNames:Array<GamePlatform['name']>):SortedLibrary {
      let filtered:SortedLibrary;

      if (platformNames.length > 0) {
        const flattenedList = Utils.flatGameLibrary(this.filteredLibrary);
        const filteredList = flattenedList.filter(
          (game) => game.platforms.find(
            (platform) => platformNames.includes(platform.name),
          ),
        );
        filtered = Utils.organizeFlattenedLibraryAsGameLibrary(filteredList);
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
      this.filteredLibrary = { ...this.library };
    },
  },
});
</script>
