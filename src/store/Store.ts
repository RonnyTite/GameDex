import { defineStore } from 'pinia';
import { CompleteGameProfile } from '@/types/SearchEntities.d';
import { GameLibrary } from '@/types/Store';

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
  getters: {
    getgameLibrary() {},
  },
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
  },
});
