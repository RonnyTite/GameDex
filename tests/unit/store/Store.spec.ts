import gameDexStore from '@/store/Store';
import { setActivePinia, createPinia } from 'pinia';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
describe('Test Pinia Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('Initial mount', () => {
    const store = gameDexStore();

    expect(store.colorSchemeIsDark).toEqual(false);
    expect(store.gameLibrary).toEqual({});
  });

  it('should set the dark theme status', () => {
    const store = gameDexStore();

    expect(store.colorSchemeIsDark).toEqual(false);
    store.setDeviceColorScheme(true);
    expect(store.colorSchemeIsDark).toEqual(true);
  });
});
