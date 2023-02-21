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

      <IonSpinner name="crescent" v-if="processing" class="mx-auto spinner"></IonSpinner>
      <div v-else>
        <IonCard v-for="(game, index) in results" :key="index">

          <IonCardContent>
            <IonItem>
              <IonThumbnail slot="start">
                <img alt="" :src="game.image.medium_url" />
              </IonThumbnail>
              <IonLabel> {{ game.name }}</IonLabel>
            </ionItem>

          </IonCardContent>

        </IonCard>
      </div>

      <!-- <ExploreContainer name="Home page" /> -->
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonSpinner,
  IonItem,
  IonThumbnail,
  IonLabel,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
import Searchbar from '../components/SearchBar.vue';
// import ExploreContainer from '../components/ExploreContainer.vue';
import searchMockJson from '../mocks/searchRequestResultsMock.json';
import { SearchResults } from '../types/searchEntities.d';
import GiantBombApi from '../scripts/GiantBombApi';

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
    IonSpinner,
    IonItem,
    IonThumbnail,
    IonLabel,
  },
  data() {
    return {
      results: [] as SearchResults['results'],
      processing: false as boolean,
    };
  },
  methods: {
    search(searchValue: SearchbarChangeEventDetail['value']): void {
      this.processing = true;
      if (searchValue) {
        GiantBombApi.makeSearch(searchValue)
          .then((searchResults) => {
            this.results = searchResults.data.results;
            this.processing = false;
          })
          .catch(() => {
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
ion-item {
  --inner-border-width: 0 0 0 0 ;
}
</style>
