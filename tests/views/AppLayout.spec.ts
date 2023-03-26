import AppLayout from '@/views/AppLayout.vue';
import { shallowMount } from '@vue/test-utils';

describe('classic mount', () => {
  let wrapper:any;

  afterEach(() => {
    wrapper.unmount();
  });
  it('classic mount', async () => {
    wrapper = shallowMount(AppLayout);
  });
});
