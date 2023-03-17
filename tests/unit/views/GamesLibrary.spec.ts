import { flushPromises, shallowMount } from '@vue/test-utils';
import Sinon from 'sinon';
import GamesLibrary from '@/views/GamesLibrary.vue';
// import gameLibraryFilteredMock from '@/mocks/gameLibraryFilteredMock.json';

// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import GamelibraryMock from '@/mocks/libraryMock.json';
import { CompleteGameProfile } from '@/types/SearchEntities';
import gameDexStore from '@/store/Store';
import { GameLibrary, SortedLibrary } from '@/types/Store';
import Utils from '@/utils/Utils';

describe('GamesLibrary.vue Emits', () => {
  let wrapper:any;
  const libraryMock = { ...GamelibraryMock } as unknown as GameLibrary;
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());

    const store = gameDexStore();

    const gameMock0 = { ...libraryMock[0] } as CompleteGameProfile;
    gameMock0.name = '070 Project'; // Name beginning with a Number
    const gameMock1 = { ...libraryMock[1] } as CompleteGameProfile;
    const gameMock2 = { ...libraryMock[2] } as CompleteGameProfile;
    const gameMock3 = { ...libraryMock[3] } as CompleteGameProfile;
    store.toggleGameInLibrary(gameMock0); // 070 Project
    store.toggleGameInLibrary(gameMock1); // Bayonetta
    store.toggleGameInLibrary(gameMock2); // Bayonetta 2
    store.toggleGameInLibrary(gameMock3); // Street Fighter
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  it('receive emits and open gamecard', async () => {
    wrapper = shallowMount(GamesLibrary);
    wrapper.vm.openGameCard(libraryMock[0]);
    await flushPromises();
    expect(wrapper.vm.modalGameId).toEqual(libraryMock[0].id.toString());
    expect(wrapper.vm.isGameCardModalOpen).toEqual(true);
  });
  it('receive emits and close gamecard', () => {
    wrapper = shallowMount(GamesLibrary);
    wrapper.vm.closeGameCard();
    expect(wrapper.vm.modalGameId).toEqual('');
    expect(wrapper.vm.isGameCardModalOpen).toEqual(false);
  });
});

describe('GamesLibrary Search and Filter', () => {
  let wrapper:any;
  let gameMock0:CompleteGameProfile;
  const libraryMock = { ...GamelibraryMock } as unknown as GameLibrary;
  let loadedLibrary:SortedLibrary;
  beforeEach(() => {
    Sinon.stub(console, 'debug');
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());

    const store = gameDexStore();

    gameMock0 = { ...libraryMock[0] } as CompleteGameProfile;
    gameMock0.name = '070 Project'; // Name beginning with a Number
    const gameMock1 = { ...libraryMock[1] } as CompleteGameProfile;
    const gameMock2 = { ...libraryMock[2] } as CompleteGameProfile;
    const gameMock3 = { ...libraryMock[3] } as CompleteGameProfile;
    store.toggleGameInLibrary(gameMock0); // 070 Project
    store.toggleGameInLibrary(gameMock1); // Bayonetta
    store.toggleGameInLibrary(gameMock2); // Bayonetta 2
    store.toggleGameInLibrary(gameMock3); // Street Fighter

    loadedLibrary = Utils.loadLibrary();
  });

  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  // SEARCH
  it('search through library', () => {
    const store = gameDexStore();
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.search('stree')).toEqual({
      S: [libraryMock[3]],
    });
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.library).toEqual(loadedLibrary);
  });

  it('search through library with no results', () => {
    const store = gameDexStore();
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.search('strte')).toEqual({});
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.library).toEqual(loadedLibrary);
  });

  it('Search request with empty string', () => {
    const store = gameDexStore();
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.search('')).toEqual(wrapper.vm.library);
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.library).toEqual(loadedLibrary);
    expect(wrapper.vm.searchedValue).toEqual('');
  });

  it('reset search', () => {
    const store = gameDexStore();
    wrapper = shallowMount(GamesLibrary);
    wrapper.vm.resetSearch();
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    expect(wrapper.vm.library).toEqual(loadedLibrary);
    expect(wrapper.vm.filteredLibrary).toEqual(loadedLibrary);
  });

  // FILTER
  it('filter through library', async () => {
    const store = gameDexStore();
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(store.gameLibrary);
    const results = wrapper.vm.filteringByPlatforms(['Arcade']);
    await flushPromises();
    expect(results).toEqual({
      S: [libraryMock[3]],
    });
  });

  it('filter through library with no platforms', () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.filteringByPlatforms([])).toEqual(loadedLibrary);
  });

  //  SEARCH AND FILTER
  it('search and filter only search', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerSearchEvent('stree');
    await flushPromises();

    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual({
      S: [libraryMock[3]],
    });
  });

  it('search and filter only filter', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerFilterEvent(['Arcade']);
    await flushPromises();
    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual({
      S: [libraryMock[3]],
    });
  });

  it('search and filter only filter', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerFilterEvent(['PlayStation 3']);
    await flushPromises();
    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual({
      '#': [gameMock0],
      S: [libraryMock[3]],
    });
  });
  it('search and filter through library', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    await wrapper.setData({
      platforms: ['PlayStation 3'],
    });

    wrapper.vm.registerSearchEvent('stree');
    await flushPromises();

    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual({
      S: [libraryMock[3]],
    });
  });

  it('search and filter and remove filter through library', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    await wrapper.setData({
      platforms: ['PlayStation 3'],
    });
    // add a search to filter further more
    wrapper.vm.registerSearchEvent('bayo');

    expect(wrapper.vm.filteredLibrary).toEqual({});
    // remove some platforms filters
    wrapper.vm.registerFilterEvent([]);

    Sinon.assert.calledTwice(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.platforms).toEqual([]);
    expect(wrapper.vm.filteredLibrary).toEqual({
      B: [libraryMock[2], libraryMock[1]],
    });
  });
});
