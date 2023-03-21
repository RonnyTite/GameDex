import { flushPromises, mount } from '@vue/test-utils';
import Sinon, { SinonSpy, SinonStub } from 'sinon';
import GameCard from '@/components/GameCard/GameCard.vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import GiantBombApi from '@/scripts/GiantBombApi';
import { axiosInstance } from '@/scripts/RequestManager';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import gameDexStore from '@/store/Store';
import { CompleteGameProfile } from '@/types/searchEntities';

const propsData = {
  isOpen: true,
  gameId: '20710',
};

const mountComponent = (props = propsData) => mount(GameCard, {
  props,
  attachTo: document.body,
});

describe('GameCard.vue', () => {
  let wrapper:any;
  let axiosMock:SinonStub;
  let fetchGameProfileSpy:SinonSpy;
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    const gameProfile = ({
      data: { results: searchMockJson.results[0] },
    });

    axiosMock = Sinon.stub(axiosInstance, 'get').resolves(gameProfile);
    fetchGameProfileSpy = Sinon.spy(GiantBombApi, 'fetchGameProfile');
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });
  it('should NOT open game card modal with', async () => {
    wrapper = mountComponent({
      isOpen: false,
      gameId: '20710',
    });
    await flushPromises();
    Sinon.assert.notCalled(fetchGameProfileSpy);
    Sinon.assert.notCalled(axiosMock);
    expect(wrapper.vm.game).toEqual({});
  });

  it('should load from store', async () => {
    const store = gameDexStore();

    const gameMock1 = { ...searchMockJson.results[1] } as CompleteGameProfile;
    store.toggleGameInLibrary(gameMock1);
    await flushPromises();
    wrapper = mountComponent({
      isOpen: true,
      gameId: '63119',
    });
    await flushPromises();

    Sinon.assert.notCalled(fetchGameProfileSpy);
    Sinon.assert.notCalled(axiosMock);

    expect(wrapper.vm.game).toEqual(gameMock1);
  });

  it('should load from giant Bomb', async () => {
    wrapper = mountComponent({
      isOpen: true,
      gameId: '20710',
    });
    await flushPromises();

    Sinon.assert.calledOnceWithExactly(fetchGameProfileSpy, '20710');
    Sinon.assert.calledOnce(axiosMock);
    expect(wrapper.vm.game).toEqual(searchMockJson.results[0]);
  });
});
