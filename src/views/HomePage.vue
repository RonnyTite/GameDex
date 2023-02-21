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
      <ExploreContainer name="Home page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/vue';

import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
import Searchbar from '../components/SearchBar.vue';
import ExploreContainer from '../components/ExploreContainer.vue';

export default defineComponent({
  components: {
    Searchbar,
    ExploreContainer,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  methods: {
    search(searchValue:SearchbarChangeEventDetail['value']):void {
      console.debug(searchValue);
    },
    clear():void {
      console.debug('clear');
    },
  },
});
</script>
