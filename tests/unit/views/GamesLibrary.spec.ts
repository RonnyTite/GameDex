import { flushPromises, shallowMount } from '@vue/test-utils';
import Sinon from 'sinon';
import GamesLibrary from '@/views/GamesLibrary.vue';
import libraryMock from '@/mocks/libraryMock.json';
import { GameProfile } from '@/types/searchEntities.d';
import Utils from '@/utils/Utils';

describe('GamesLibrary.vue Emits', () => {
  let wrapper:any;
  const library = libraryMock as Array<GameProfile>;
  beforeEach(() => {
    Sinon.stub(Utils, 'loadLibraryFromStore').returns(library);
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  it('receive emits and open gamecard', async () => {
    wrapper = shallowMount(GamesLibrary);
    wrapper.vm.openGameCard(library[0]);
    await flushPromises();
    expect(wrapper.vm.modalGameId).toEqual(library[0].id.toString());
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
  const library = libraryMock as Array<GameProfile>;
  beforeEach(() => {
    Sinon.stub(Utils, 'loadLibraryFromStore').returns(library);
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });
  // SEARCH
  it('search through library', () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.search('stree')).toEqual([library[3]]);
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.library).toEqual(library);
  });

  it('search through library with no results', () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.search('strte')).toEqual([]);
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.library).toEqual(library);
  });

  it('Search request with emtpy string', () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.search('')).toEqual(wrapper.vm.library);
    // check after search that raw library was not impacted
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.searchedValue).toEqual('');
  });

  it('reset search', () => {
    wrapper = shallowMount(GamesLibrary);
    wrapper.vm.resetSearch();
    expect(wrapper.vm.rawLibrary).toEqual(library);
    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.filteredLibrary).toEqual(wrapper.vm.library);
  });

  // FILTER
  it('filter through library', async () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.rawLibrary).toEqual(library);
    const results = wrapper.vm.filteringByPlatforms(['Arcade']);
    await flushPromises();
    expect(results).toEqual([library[3]]);
  });

  it('filter through library with no platforms', () => {
    wrapper = shallowMount(GamesLibrary);
    expect(wrapper.vm.filteringByPlatforms([])).toEqual(library);
  });

  //  SEARCH AND FILTER
  it('search and filter only search', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerSearchEvent('stree');
    await flushPromises();

    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual([library[3]]);
  });

  it('search and filter only filter', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerFilterEvent(['Arcade']);
    await flushPromises();
    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual([library[3]]);
  });

  it('search and filter only filter', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    wrapper.vm.registerFilterEvent(['PlayStation 3']);
    await flushPromises();
    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual([library[0], library[3]]);
  });
  it('search and filter through library', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');

    await wrapper.setData({
      platforms: ['PlayStation 3'],
    });

    wrapper.vm.registerSearchEvent('bayo');
    await flushPromises();

    Sinon.assert.calledOnce(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.filteredLibrary).toEqual([library[0]]);
  });

  it('search and filter and remove filter through library', async () => {
    wrapper = shallowMount(GamesLibrary);
    Sinon.spy(wrapper.vm, 'searchAndFilter');
    await wrapper.setData({
      platforms: ['PlayStation 3'],
    });
    // add a search to filter further more
    wrapper.vm.registerSearchEvent('bayo');

    expect(wrapper.vm.filteredLibrary).toEqual([library[0]]);
    // remove some platforms filters
    wrapper.vm.registerFilterEvent([]);

    Sinon.assert.calledTwice(wrapper.vm.searchAndFilter);
    expect(wrapper.vm.platforms).toEqual([]);
    expect(wrapper.vm.filteredLibrary).toEqual([library[0], library[1], library[2]]);
  });
});
