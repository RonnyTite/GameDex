import { flushPromises, mount } from '@vue/test-utils';
import sinon from 'sinon';
import { AxiosResponse } from 'axios';
import GameCard from '@/components/GameCard.vue';
import GiantBombApi from '@/scripts/GiantBombApi';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import { CompleteGameProfile } from '@/types/searchEntities.d';

const propsData = {
  isOpen: true,
  gameId: '20710',
};

const mountComponent = (props = propsData) => mount(GameCard, {
  props,
});

describe('GameCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    const gameProfile = ({ data: searchMockJson.results[0] }) as AxiosResponse<CompleteGameProfile>;
    sinon.stub(GiantBombApi, 'fetchGameProfile').resolves(gameProfile);
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should open game card modal with', async () => {
    wrapper = mountComponent();
    await flushPromises();
    expect(wrapper.vm.game).toEqual(searchMockJson.results[0]);
  });
  it('should NOT open game card modal with', async () => {
    wrapper = mountComponent({
      isOpen: false,
      gameId: '20710',
    });
    await flushPromises();
    expect(wrapper.vm.game).toEqual({});
  });
});
