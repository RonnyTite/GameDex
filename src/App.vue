<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import gameDexStore from '@/store/Store';

const store = gameDexStore();
const isDark:boolean = window.matchMedia('(prefers-color-scheme:dark)').matches;

store.setDeviceColorScheme(isDark);

</script>
