import { defineStore } from 'pinia';
import { GameLibrary } from '@/types/Store.d';
import { CompleteGameProfile } from '@/types/searchEntities';

// https://pinia.vuejs.org/core-concepts/
interface GameDexState {
  gameLibrary: GameLibrary
  colorSchemeIsDark: boolean
}

export default defineStore('gameDexStore', {
  state: ():GameDexState => ({
    gameLibrary: {},
    colorSchemeIsDark: false,
  }),
  actions: {
    toggleGameInLibrary(game:CompleteGameProfile):boolean {
      const gameId = game.id.toString();
      const isAlreadySaved = Object.keys(this.gameLibrary).includes(gameId);

      let isSaved:boolean;

      if (isAlreadySaved) {
        delete this.gameLibrary[gameId];
        console.debug(`${gameId} has been removed`);
        isSaved = false;
      } else {
        this.gameLibrary = {
          [gameId]: game,
          ...this.gameLibrary,
        };
        console.debug(`${gameId} has been saved`);
        isSaved = true;
      }

      return isSaved;
    },

    setDeviceColorScheme(isDark:boolean):void {
      this.colorSchemeIsDark = isDark;
      console.debug(`Dark mode is ${this.colorSchemeIsDark ? 'enabled' : 'disabled'}`);
    },
    wipe() {
      this.gameLibrary = {};
      this.colorSchemeIsDark = false;
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
