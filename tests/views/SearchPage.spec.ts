import { mount } from '@vue/test-utils';
import Sinon, { SinonStub, SinonSpy } from 'sinon';
import SearchPage from '@/views/SearchPage.vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import { GameProfile, SearchResults } from '@/types/searchEntities';
import { axiosInstance } from '@/scripts/RequestManager';
import GiantBombApi from '@/scripts/GiantBombApi';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';

describe('SearchPage.vue', () => {
  let wrapper:any;
  let axiosMock:SinonStub;
  const searchResultsStub = ({
    data: { results: searchMockJson.results },
  });
  let makeSearchSpy:SinonSpy;
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    axiosMock = Sinon.stub(axiosInstance, 'get').resolves(searchResultsStub);
    makeSearchSpy = Sinon.spy(GiantBombApi, 'makeSearch');
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  const results = searchMockJson as SearchResults<Array<GameProfile>>;
  it('receive emits and open gamecard', () => {
    wrapper = mount(SearchPage);
    wrapper.vm.openGameCard(results.results[0]);
    expect(wrapper.vm.modalGameId).toEqual(results.results[0].id.toString());
    expect(wrapper.vm.isGameCardModalOpen).toEqual(true);
  });
  it('receive emits and close gamecard', () => {
    wrapper = mount(SearchPage);
    wrapper.vm.closeGameCard();
    expect(wrapper.vm.modalGameId).toEqual('');
    expect(wrapper.vm.isGameCardModalOpen).toEqual(false);
  });

  it('clear Search', () => {
    wrapper = mount(SearchPage);
    wrapper.vm.clear();
    expect(wrapper.vm.results).toEqual([]);
  });

  it('Search request  with text', () => {
    wrapper = mount(SearchPage);
    wrapper.vm.search('unitTestPurposeSearch');

    Sinon.assert.calledOnceWithExactly(makeSearchSpy, 'unitTestPurposeSearch');
    Sinon.assert.calledOnce(axiosMock);
  });

  it('Search request with emtpy string', () => {
    wrapper = mount(SearchPage);
    wrapper.vm.search('');

    Sinon.assert.notCalled(makeSearchSpy);
    Sinon.assert.notCalled(axiosMock);
  });
});
