import { flushPromises, mount } from '@vue/test-utils';
import Sinon, { SinonSpy, SinonStub } from 'sinon';
import GameCard from '@/components/GameCard.vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import GiantBombApi from '@/scripts/GiantBombApi';
import { axiosInstance } from '@/scripts/RequestManager';

const propsData = {
  isOpen: true,
  gameId: '20710',
};

const mountComponent = (props = propsData) => mount(GameCard, {
  props,
});

describe('GameCard.vue', () => {
  let wrapper:any;
  let axiosMock:SinonStub;
  let fetchGameProfileSpy:SinonSpy;
  beforeEach(() => {
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
  it('should open game card modal with', async () => {
    wrapper = mountComponent();
    await flushPromises();
    Sinon.assert.calledOnceWithExactly(fetchGameProfileSpy, '20710');
    Sinon.assert.calledOnce(axiosMock);
    expect(wrapper.vm.game).toEqual(searchMockJson.results[0]);
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

  it('should not display Share if not possible ', () => {
    wrapper = mountComponent();

    const shareButton = wrapper.find('.share-button');
    expect(shareButton.exists()).toEqual(false);
  });
});
