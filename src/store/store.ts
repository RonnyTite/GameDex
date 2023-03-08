// import { GameProfile } from '@/types/searchEntities';
import { defineStore } from 'pinia';

// interface GameDexStore {
//   gameLibrary: Array<GameProfile>,
//   colorSchemeIsDark: boolean | null,
// }

// https://pinia.vuejs.org/core-concepts/

export default defineStore('gameDexStore', {
  state: () => ({
    gameLibrary: {},
    colorSchemeIsDark: true,
  }),
  getters: {
    getgameLibrary() {},
  },
  actions: {
    saveGame() {

    },
  },
});
