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
          <IonIcon :icon="settingsOutline" />
          <IonLabel>Settings</IonLabel>
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
  gameControllerOutline, settingsOutline, libraryOutline, searchOutline,
} from 'ionicons/icons';

</script>
<style>
ion-toolbar {
  --background: #1f6cf8;
}
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
