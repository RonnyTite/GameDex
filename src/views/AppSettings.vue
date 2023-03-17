<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="app-header">
        <IonTitle
          class="font__pixel ion-text-uppercase"
          color="light"
        >
          Settings
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            Settings
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <IonIcon
          v-if="store.colorSchemeIsDark"
          :icon="moon"
        />
        <IonIcon
          v-else
          :icon="moonOutline"
        />
        <ion-label class="ion-margin-start">
          Toggle Dark Theme
        </ion-label>
        <IonToggle
          slot="end"
          color="primary"
          class="theme-toggler"
          :enable-on-off-labels="true"
          :checked="store.colorSchemeIsDark"
          @ion-change="toggleDarkMode"
        />
      </IonItem>
      <IonItem @click="wipe">
        <IonIcon
          :icon="trashOutline"
        />
        <IonLabel class="ion-margin-start">
          Wipe Everything
        </IonLabel>
      </IonItem>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ToggleCustomEvent,
  IonToggle, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dialog } from '@capacitor/dialog';
import { trashOutline, moonOutline, moon } from 'ionicons/icons';
import gameDexStore from '@/store/Store';

const store = gameDexStore();

function toggleDarkMode(event:ToggleCustomEvent):void {
  const isDarkTheme = event.detail.checked;
  store.setDeviceColorScheme(isDarkTheme);
  document.body.classList.toggle('dark', isDarkTheme);
}

function wipe():void {
  // https://ionicframework.com/docs/native/dialog#example
  Dialog.confirm({
    title: 'Confirm',
    message: 'Are you sure you\'d like to wipe the whole app?',
  })
    .then((confirmAnswer) => {
      if (confirmAnswer.value) {
        store.wipe();
      } else {
        // CANCEL
      }
    });
}

</script>
<style scoped>
ion-toggle, ion-icon {
  cursor: pointer
}
</style>
