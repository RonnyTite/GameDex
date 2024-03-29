import gameDexStore from '@/store/Store';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import gameMock from '@/mocks/gameMock.json';
import { CompleteGameProfile } from '@/types/searchEntities';
import { flushPromises } from '@vue/test-utils';
import Sinon from 'sinon';
import libraryMock from '@/mocks/libraryMock.json';

describe('Test Pinia Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    Sinon.stub(console, 'debug');
  });
  afterEach(() => {
    Sinon.restore();
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

  it('should wipe everything', () => {
    const store = gameDexStore();
    const gameMock1 = { ...libraryMock[1] } as CompleteGameProfile;
    // Set data in store
    store.setDeviceColorScheme(true);
    store.toggleGameInLibrary(gameMock1);

    store.wipe();

    expect(store.colorSchemeIsDark).toEqual(false);
    expect(store.gameLibrary).toEqual({});
  });

  describe('Interact with gamelibrary', () => {
    it('should save game', () => {
      const store = gameDexStore();

      const game = gameMock as CompleteGameProfile;

      expect(store.toggleGameInLibrary(game)).toEqual(true);
      expect(store.gameLibrary[game.id]).toEqual(game);
    });

    it('should save game, then delete', async () => {
      const store = gameDexStore();

      const game = gameMock as CompleteGameProfile;

      expect(store.toggleGameInLibrary(game)).toEqual(true);
      expect(store.gameLibrary[game.id]).toEqual(game);
      await flushPromises();

      expect(store.toggleGameInLibrary(game)).toEqual(false);
      expect(store.gameLibrary[game.id]).toEqual(undefined);
    });
  });
});
