import gameDexStore from '@/store/Store';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import gameMock from '@/mocks/gameMock.json';
import { CompleteGameProfile } from '@/types/searchEntities';
import { flushPromises } from '@vue/test-utils';

describe('Test Pinia Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('Initial mount', () => {
    const store = gameDexStore();

    expect(store.colorSchemeIsDark).toEqual(false);
    expect(store.gameLibrary).toEqual({});
  });

  it('should set the dark theme status', () => {
    const store = gameDexStore();

    expect(store.colorSchemeIsDark).toEqual(false);
    store.setDeviceColorScheme(true);
    expect(store.colorSchemeIsDark).toEqual(true);
  });

  describe('Interact with gamelibrary', () => {
    it('should save game', () => {
      const store = gameDexStore();

      const game = gameMock as CompleteGameProfile;

      store.toggleGameInLibrary(game);
      expect(store.gameLibrary[game.id]).toEqual(game);
    });

    it('should save game, then delete', async () => {
      const store = gameDexStore();

      const game = gameMock as CompleteGameProfile;

      store.toggleGameInLibrary(game);
      expect(store.gameLibrary[game.id]).toEqual(game);
      await flushPromises();

      store.toggleGameInLibrary(game);
      expect(store.gameLibrary[game.id]).toEqual(undefined);
    });
  });
});
