import { flushPromises, mount } from '@vue/test-utils';
import { GameProfile, GamePlatform } from '@/types/searchEntities';
import PlatformsFilter from '@/components/PlatformsFilter.vue';
import { CheckboxCustomEvent } from '@ionic/vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';

describe('PlatformsFilter.vue Real mount', () => {
  let wrapper:any;
  beforeEach(() => {
    // https://jestjs.io/docs/timer-mocks
    jest.useFakeTimers();
    jest.spyOn(window, 'setTimeout');
    wrapper = mount(PlatformsFilter, {
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });
  });
  afterEach(() => {
    wrapper.unmount();
    // https://jestjs.io/docs/jest-object#jestrestoreallmocks
    jest.restoreAllMocks();
  });
  it('should compute platforms filters', async () => {
    // wrapper.vm.computingPlatformFilter();
    await flushPromises();
    expect(wrapper.vm.platforms).toEqual([
      { value: 'Browser', checked: false },
      { value: 'Nintendo Switch', checked: false },
      { value: 'PC', checked: false },
      { value: 'PlayStation 3', checked: false },
      { value: 'PlayStation 4', checked: false },
      { value: 'PlayStation Network (PS3)', checked: false },
      { value: 'Wii U', checked: false },
      { value: 'Xbox 360', checked: false },
      { value: 'Xbox One', checked: false },
    ]);
  });

  it('should reset filters', async () => {
    wrapper = mount(PlatformsFilter, {
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });

    await flushPromises();
    // enable some filters
    wrapper.setData({
      platforms: [
        { value: 'Browser', checked: false },
        { value: 'Nintendo Switch', checked: false },
        { value: 'PC', checked: false },
        { value: 'PlayStation 3', checked: false },
        { value: 'PlayStation 4', checked: true },
        { value: 'PlayStation Network (PS3)', checked: false },
        { value: 'Wii U', checked: false },
        { value: 'Xbox 360', checked: false },
        { value: 'Xbox One', checked: false },
      ],
    });

    // Check if filters is applied
    expect(wrapper.vm.platforms).toEqual([
      { value: 'Browser', checked: false },
      { value: 'Nintendo Switch', checked: false },
      { value: 'PC', checked: false },
      { value: 'PlayStation 3', checked: false },
      { value: 'PlayStation 4', checked: true },
      { value: 'PlayStation Network (PS3)', checked: false },
      { value: 'Wii U', checked: false },
      { value: 'Xbox 360', checked: false },
      { value: 'Xbox One', checked: false },
    ]);

    wrapper.vm.resetFilter();
    // Check if filters is reset
    expect(wrapper.vm.platforms).toEqual([
      { value: 'Browser', checked: false },
      { value: 'Nintendo Switch', checked: false },
      { value: 'PC', checked: false },
      { value: 'PlayStation 3', checked: false },
      { value: 'PlayStation 4', checked: false },
      { value: 'PlayStation Network (PS3)', checked: false },
      { value: 'Wii U', checked: false },
      { value: 'Xbox 360', checked: false },
      { value: 'Xbox One', checked: false },
    ]);
  });

  it('should enable filters', async () => {
    wrapper = mount(PlatformsFilter, {
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });

    const eventDetail = {
      detail: {
        value: 'PC',
        checked: true,
      },
    } as CheckboxCustomEvent<GamePlatform['abbreviation']>;

    wrapper.vm.filteringByPlatforms(eventDetail);
    await flushPromises();
    // Check if filters is applied
    expect(wrapper.vm.platforms).toEqual([
      { value: 'Browser', checked: false },
      { value: 'Nintendo Switch', checked: false },
      { value: 'PC', checked: true },
      { value: 'PlayStation 3', checked: false },
      { value: 'PlayStation 4', checked: false },
      { value: 'PlayStation Network (PS3)', checked: false },
      { value: 'Wii U', checked: false },
      { value: 'Xbox 360', checked: false },
      { value: 'Xbox One', checked: false },
    ]);

    expect(wrapper.emitted().onFilter[0]).toEqual([['PC']]);
    expect(wrapper.vm.isFilterActive).toEqual(true);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 800);
  });

  it('should disable filters', async () => {
    wrapper = mount(PlatformsFilter, {
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });

    const eventDetail = {
      detail: {
        value: 'PlayStation 4',
        checked: false,
      },
    } as CheckboxCustomEvent<GamePlatform['abbreviation']>;

    // enable some filters
    wrapper.setData({
      platforms: [
        { value: 'Browser', checked: false },
        { value: 'Nintendo Switch', checked: false },
        { value: 'PC', checked: false },
        { value: 'PlayStation 3', checked: false },
        { value: 'PlayStation 4', checked: true },
        { value: 'PlayStation Network (PS3)', checked: false },
        { value: 'Wii U', checked: false },
        { value: 'Xbox 360', checked: false },
        { value: 'Xbox One', checked: false },
      ],
    });

    wrapper.vm.filteringByPlatforms(eventDetail);
    await flushPromises();
    // Check if filters are reset
    expect(wrapper.vm.platforms).toEqual([
      { value: 'Browser', checked: false },
      { value: 'Nintendo Switch', checked: false },
      { value: 'PC', checked: false },
      { value: 'PlayStation 3', checked: false },
      { value: 'PlayStation 4', checked: false },
      { value: 'PlayStation Network (PS3)', checked: false },
      { value: 'Wii U', checked: false },
      { value: 'Xbox 360', checked: false },
      { value: 'Xbox One', checked: false },
    ]);

    expect(wrapper.emitted().resetFilter[0]).toEqual([]);
    expect(wrapper.vm.isFilterActive).toEqual(false);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 800);
  });
});
