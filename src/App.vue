<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import gameDexStore from '@/store/Store';

const store = gameDexStore();
let isDark = store.colorSchemeIsDark;

if (isDark === null) {
  isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  store.setDeviceColorScheme(isDark);
}
if (typeof isDark === 'boolean')document.body.classList.toggle('dark', isDark);

</script>
