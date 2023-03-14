import { defineStore } from 'pinia';

// https://pinia.vuejs.org/core-concepts/

export default defineStore('gameDexStore', {
  state: () => ({
    gameLibrary: {},
    colorSchemeIsDark: false,
  }),
  getters: {
    getgameLibrary() {},
  },
  actions: {
    saveGame() {},
    setDeviceColorScheme(isDark:boolean):void {
      this.colorSchemeIsDark = isDark;
      console.debug(`Dark mode is ${this.colorSchemeIsDark ? 'enabled' : 'disabled'}`);
    },
  },
});
