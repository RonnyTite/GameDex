import { defineStore } from 'pinia';

// https://pinia.vuejs.org/core-concepts/

export default defineStore('gameDexStore', {
  state: () => ({
    gameLibrary: {},
  }),
  getters: {
    getgameLibrary() {},
  },
  actions: {
    saveGame() {

    },
  },
});
