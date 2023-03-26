import { mount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('emits on change', () => {
    const wrapper = mount(SearchBar);
    wrapper.vm.emitSearch({ value: 'test' });
    expect(wrapper.emitted()['on-search'][0]).toEqual(['test']);
  });
});

describe('SearchBar.vue', () => {
  it('clear', () => {
    const wrapper = mount(SearchBar);
    wrapper.vm.clear();
    expect(wrapper.emitted().clear[0]).toEqual([]);
  });
});
