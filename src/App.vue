<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Utils from '@/utils/Utils';

const isDark:boolean = window.matchMedia('(prefers-color-scheme:dark)').matches;

Utils.setDeviceColorScheme(isDark);
console.debug(`Dark mode is ${isDark ? 'enabled' : 'disabled'} at launch`);

</script>
