import { mount } from '@vue/test-utils';
import sinon from 'sinon';
import GamesLibrary from '@/views/GamesLibrary.vue';
import libraryMock from '@/mocks/libraryMock.json';
import { GameProfile } from '@/types/searchEntities.d';
import Utils from '../../../src/utils/Utils';

describe('GamesLibrary.vue', () => {
  let wrapper;
  const library = libraryMock as Array<GameProfile>;
  beforeEach(() => {
    sinon.stub(Utils, 'loadLibraryFromStore').returns(library);
  });
  afterEach(() => {
    sinon.restore();
  });

  it('receive emits and open gamecard', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.openGameCard(library[0]);
    expect(wrapper.vm.modalGameId).toEqual(library[0].id.toString());
    expect(wrapper.vm.isGameCardModalOpen).toEqual(true);
  });
  it('receive emits and close gamecard', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.closeGameCard();
    expect(wrapper.vm.modalGameId).toEqual('');
    expect(wrapper.vm.isGameCardModalOpen).toEqual(false);
  });

  it('search through library', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.search('stree');
    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.filteredLibrary).toEqual([library[3]]);
  });

  it('search through library with no results', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.search('strte');
    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.filteredLibrary).toEqual([]);
  });

  it('Search request with emtpy string', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.search('');

    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.filteredLibrary).toEqual(wrapper.vm.library);
  });

  it('Search request with emtpy string', () => {
    wrapper = mount(GamesLibrary);
    wrapper.vm.resetSearch();

    expect(wrapper.vm.library).toEqual(library);
    expect(wrapper.vm.filteredLibrary).toEqual(wrapper.vm.library);
  });
});
