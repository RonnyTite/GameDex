<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home" href="/tabs/homepage">
          <ion-icon :icon="gameController" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/tabs/library">
          <ion-icon :icon="libraryOutline" />
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Account" href="/tabs/account">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet,
} from '@ionic/vue';
import { gameController, personCircleOutline, libraryOutline } from 'ionicons/icons';

</script>
