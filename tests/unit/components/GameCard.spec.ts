import { flushPromises, mount } from '@vue/test-utils';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import GameCard from '@/components/GameCard.vue';
import GiantBombApi from '../../../src/scripts/GiantBombApi';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import { axiosInstance } from '../../../src/scripts/RequestManager';

const propsData = {
  isOpen: true,
  gameId: '20710',
};

const mountComponent = (props = propsData) => mount(GameCard, {
  props,
});

describe('GameCard.vue', () => {
  let wrapper;
  let axiosMock:SinonStub;
  let fetchGameProfileSpy:SinonSpy;
  beforeEach(() => {
    const gameProfile = ({
      data: { results: searchMockJson.results[0] },
    });

    axiosMock = sinon.stub(axiosInstance, 'get').resolves(gameProfile);

    fetchGameProfileSpy = sinon.spy(GiantBombApi, 'fetchGameProfile');
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should open game card modal with', async () => {
    wrapper = mountComponent();
    await flushPromises();
    sinon.assert.calledOnceWithExactly(fetchGameProfileSpy, '20710');
    sinon.assert.calledOnce(axiosMock);
    expect(wrapper.vm.game).toEqual(searchMockJson.results[0]);
  });
  it('should NOT open game card modal with', async () => {
    wrapper = mountComponent({
      isOpen: false,
      gameId: '20710',
    });
    await flushPromises();
    sinon.assert.notCalled(fetchGameProfileSpy);
    sinon.assert.notCalled(axiosMock);
    expect(wrapper.vm.game).toEqual({});
  });
});
