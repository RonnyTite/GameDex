import { mount } from '@vue/test-utils';
import HomePage from '@/views/HomePage.vue';

describe('HomePage.vue', () => {
  it('renders tab 1 HomePage', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.text()).toMatch('GameDex');
  });
});
