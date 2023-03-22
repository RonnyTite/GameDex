import { flushPromises, mount } from '@vue/test-utils';
import Sinon from 'sinon';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import gameDexStore from '@/store/Store';
import { CompleteGameProfile } from '@/types/searchEntities';
import GameCardContent from '@/components/GameCardContent.vue';

const propsData = {
  game: searchMockJson.results[0],
};

const mountComponent = (props = propsData) => mount(GameCardContent, {
  props,
});

describe('GameCardContent.vue with already saved game', () => {
  let wrapper:any;
  beforeEach(async () => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    const store = gameDexStore();

    const gameMock1 = { ...searchMockJson.results[0] } as CompleteGameProfile;
    store.toggleGameInLibrary(gameMock1);
    await flushPromises();
    wrapper = mountComponent();
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  it('should display heart filled if already saved at mount', async () => {
    const heartButton = wrapper.find('.heartbeat');
    expect(heartButton.exists()).toEqual(true);

    const heartButtonSlowbeat = wrapper.find('.slowbeat');
    expect(heartButtonSlowbeat.exists()).toEqual(false);
  });

  it('should display heart animation when saving', () => {
    wrapper.vm.toggleGameInLibrary();

    const heartButton = wrapper.find('.heartbeat');
    expect(heartButton.exists()).toEqual(true);

    const heartButtonSlowbeat = wrapper.find('.slowbeat');
    expect(heartButtonSlowbeat.exists()).toEqual(false);
  });
});

describe('GameCardContent.vue with game not saved', () => {
  let wrapper:any;
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    wrapper = mountComponent();
  });
  afterEach(() => {
    wrapper.unmount();
    Sinon.restore();
  });

  it('should Not display heart filled if NOT saved at mount', async () => {
    const heartButton = wrapper.find('.heartbeat');
    expect(heartButton.exists()).toEqual(false);

    const heartButtonSlowbeat = wrapper.find('.slowbeat');
    expect(heartButtonSlowbeat.exists()).toEqual(true);
  });
  it('should NOT display heart filled if already saved ', () => {
    wrapper.vm.toggleHeartAnimation();

    const heartButton = wrapper.find('.heartbeat');
    expect(heartButton.exists()).toEqual(false);

    const heartButtonSlowbeat = wrapper.find('.slowbeat');
    expect(heartButtonSlowbeat.exists()).toEqual(true);
  });
});
