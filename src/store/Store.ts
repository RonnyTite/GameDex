import { defineStore } from 'pinia';
import { GameLibrary } from '@/types/Store.d';
import { CompleteGameProfile } from '@/types/searchEntities';

// https://pinia.vuejs.org/core-concepts/
interface GameDexState {
  gameLibrary: GameLibrary
  colorSchemeIsDark: boolean | null
}

export default defineStore('gameDexStore', {
  state: ():GameDexState => ({
    gameLibrary: {},
    colorSchemeIsDark: null,
  }),
  actions: {
    toggleGameInLibrary(game:CompleteGameProfile):void {
      const gameId = game.id.toString();
      const isAlreadySaved = Object.keys(this.gameLibrary).includes(gameId);

      if (isAlreadySaved) {
        delete this.gameLibrary[gameId];
        console.debug(`${gameId} has been removed`);
      } else {
        this.gameLibrary = {
          [gameId]: game,
          ...this.gameLibrary,
        };
        console.debug(`${gameId} has been saved`);
      }
    },

    setDeviceColorScheme(isDark:boolean):void {
      this.colorSchemeIsDark = isDark;
      console.debug(`Dark mode is ${this.colorSchemeIsDark ? 'enabled' : 'disabled'}`);
    },
    wipe() {
      this.gameLibrary = {};
      this.colorSchemeIsDark = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'gameDexStore',
        storage: localStorage,
      },
    ],
  },
});
