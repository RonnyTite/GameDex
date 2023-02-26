import { mount } from '@vue/test-utils';
import DisplayAsList from '@/components/DisplayAsList.vue';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';

describe('DisplayAsList.vue', () => {
  it('click on item on the list', () => {
    const wrapper = mount(DisplayAsList, {
      props: {
        dataList: searchMockJson.results,
      },
    });
    const listElement = wrapper.find('.home-game-card');
    expect(listElement.exists()).toEqual(true);
    listElement.trigger('click');
    expect(wrapper.emitted()['open-gamecard'][0]).toEqual([searchMockJson.results[0]]);
  });
});
