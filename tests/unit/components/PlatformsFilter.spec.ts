import { flushPromises, mount } from '@vue/test-utils';
import { GameProfile } from '@/types/searchEntities';
import PlatformsFilter from '@/components/PlatformsFilter.vue';
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

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 800);
  });

  it('should enable filters', async () => {
    wrapper = mount(PlatformsFilter, {
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });

    // check initial state
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

    //  platforms is handled by the v model of the checkboxes so i need to set them manually
    // enable some filters
    await wrapper.setData({
      platforms: [
        { value: 'Browser', checked: false },
        { value: 'Nintendo Switch', checked: false },
        { value: 'PC', checked: true },
        { value: 'PlayStation 3', checked: false },
        { value: 'PlayStation 4', checked: false },
        { value: 'PlayStation Network (PS3)', checked: false },
        { value: 'Wii U', checked: false },
        { value: 'Xbox 360', checked: false },
        { value: 'Xbox One', checked: false },
      ],
    });
    wrapper.vm.filteringByPlatforms();
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
  });

  it('should disable filters', async () => {
    wrapper = mount(PlatformsFilter, {
      data: () => ({
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
      }),
      props: {
        dataList: searchMockJson.results as Array<GameProfile>,
      },
    });

    // Check mounted data
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

    // dsiable filters
    await wrapper.setData({
      platforms: [
        { value: 'Browser', checked: false },
        { value: 'Nintendo Switch', checked: false },
        { value: 'PC', checked: false },
        { value: 'PlayStation 3', checked: false },
        { value: 'PlayStation 4', checked: false },
        { value: 'PlayStation Network (PS3)', checked: false },
        { value: 'Wii U', checked: false },
        { value: 'Xbox 360', checked: false },
        { value: 'Xbox One', checked: false },
      ],
    });

    wrapper.vm.filteringByPlatforms();

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

    expect(wrapper.emitted().onFilter[0]).toEqual([[]]); // results of emits is an Array
    expect(wrapper.vm.isFilterActive).toEqual(false);
  });
});
