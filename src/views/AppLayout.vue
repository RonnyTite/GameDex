<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom">
        <IonTabButton
          tab="Home"
          href="/tabs/homepage"
        >
          <IonIcon :icon="gameControllerOutline" />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="library"
          href="/tabs/library"
        >
          <IonIcon :icon="libraryOutline" />
          <IonLabel>Library</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="search"
          href="/tabs/search"
        >
          <IonIcon :icon="searchOutline" />
          <IonLabel>Library</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="Account"
          href="/tabs/account"
        >
          <IonIcon :icon="personCircleOutline" />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet,
} from '@ionic/vue';
import {
  gameControllerOutline, personCircleOutline, libraryOutline, searchOutline,
} from 'ionicons/icons';

</script>
