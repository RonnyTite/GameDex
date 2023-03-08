<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import gameDexStore from '@/store/store';

const store = gameDexStore();

// interface ColorScheme {
//   backgroundColor: string
//   color: string
// }

const isDark:boolean = window.matchMedia('(prefers-color-scheme:dark)').matches;

// const lightTheme:ColorScheme = {
//   backgroundColor: 'white',
//   color: 'black',
// };

// const darkTheme:ColorScheme = {
//   backgroundColor: 'black',
//   color: 'white',
// };

function setDeviceColorScheme():void {
  store.colorSchemeIsDark = isDark;
}

setDeviceColorScheme();

// return {
//   isDark,
//   lightTheme,
//   darkTheme,
// };
</script>
