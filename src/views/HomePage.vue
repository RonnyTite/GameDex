<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense"></ion-header>
      <Searchbar @onSearch="search($event)" @clear="clear"></Searchbar>

      <ion-card v-for="(game, index) in results" :key="index">
        <ion-card-header>
          <ion-card-title>{{ index }}</ion-card-title>
          <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
        </ion-card-header>

        <ion-card-content>
          {{ game }}
        </ion-card-content>
      </ion-card>

      <!-- <ExploreContainer name="Home page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader,
  // IonCardSubtitle,
  IonCardTitle,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
import Searchbar from '../components/SearchBar.vue';
// import ExploreContainer from '../components/ExploreContainer.vue';
import searchMockJson from '../mocks/searchMock.json';
import { SearchResults } from '../types/searchEntities.d';

export default defineComponent({
  components: {
    Searchbar,
    // ExploreContainer,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    // IonCardSubtitle,
    IonCardTitle,
  },
  data() {
    return {
      results: {} as SearchResults,
    };
  },
  methods: {
    search(searchValue: SearchbarChangeEventDetail['value']): void {
      console.debug(searchValue);
      if (searchValue) {
        this.results = searchMockJson as SearchResults;
      }
    },
    clear(): void {
      this.results = {};
      console.debug('clear');
    },
  },
});
</script>
