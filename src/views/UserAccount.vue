<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
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
      <ion-item>
        <ion-label>Dark Mode</ion-label>
        <IonToggle
          color="primary"
          :enable-on-off-labels="true"
          :checked="isDarkModeEnabled"
          @ion-change="toggleDarkMode"
        />
      </ion-item>
      <ion-item>
        <ion-label>Wipe Everything </ion-label>
        <IonIcon :icon="trashOutline" />
      </ion-item>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ToggleCustomEvent,
  IonToggle, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { ref } from 'vue';
import gameDexStore from '@/store/store';
import { trashOutline } from 'ionicons/icons';

const store = gameDexStore();

const isDarkModeEnabled = ref(store.colorSchemeIsDark);

function toggleDarkMode(event:ToggleCustomEvent):void {
  console.debug(`Dark mode is ${event.detail.checked ? 'enabled' : 'disabled'}`);
  isDarkModeEnabled.value = event.detail.checked;
  store.colorSchemeIsDark = event.detail.checked;
}

</script>
<style scoped>
ion-toggle, ion-icon {
  cursor: pointer
}
</style>
