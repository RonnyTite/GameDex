<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense"></IonHeader>
      <Searchbar @onSearch="search($event)" @clear="clear"></Searchbar>

      <IonCard v-for="(game, index) in results" :key="index">
        <IonCardHeader>
          <IonCardTitle>{{ index }}</IonCardTitle>
          <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
        </IonCardHeader>

        <IonCardContent>
          {{ game }}
        </IonCardContent>
      </IonCard>

      <!-- <ExploreContainer name="Home page" /> -->
    </IonContent>
  </IonPage>
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
