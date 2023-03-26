import AppSettings from '@/views/AppSettings.vue';
import { mount } from '@vue/test-utils';
import gameDexStore from '@/store/Store';
import { setActivePinia, createPinia } from 'pinia';

describe('classic mount', () => {
  let wrapper:any;

  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('set dark theme', async () => {
    const store = gameDexStore();
    store.setDeviceColorScheme(false);

    wrapper = mount(AppSettings);

    const toggler = wrapper.find('.theme-toggler');
    expect(toggler.exists()).toEqual(true);
  });
});
