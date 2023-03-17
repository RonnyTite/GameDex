import { CompleteGameProfile, GameProfile } from '@/types/searchEntities';
import Utils from '@/utils/Utils';
// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from 'pinia';
import libraryMock from '@/mocks/libraryMock.json';
import gameDexStore from '@/store/Store';
import Sinon from 'sinon';

describe('Utils', () => {
  describe('computeReleaseDate', () => {
    it('should compute with original release date', () => {
      const game = {
        expected_release_day: 2,
        expected_release_month: 3,
        expected_release_quarter: null,
        expected_release_year: 2023,
        original_release_date: '2014-09-20',
      } as GameProfile;
      expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('September 20, 2014');
    });
    it('should compute without original release date', () => {
      const game = {
        expected_release_day: 2,
        expected_release_month: 3,
        expected_release_quarter: null,
        expected_release_year: 2023,
        original_release_date: null,
      } as GameProfile;
      expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('March 2, 2023');
    });
    it('should compute with only year', () => {
      const game = {
        expected_release_quarter: null,
        expected_release_year: 2023,
        original_release_date: null,
      } as GameProfile;

      expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('2023');
    });

    it('should compute for quarter', () => {
      const game = {
        expected_release_quarter: 2,
        expected_release_year: 2023,
      } as GameProfile;
      expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('Q2 2023');
    });
    it('should return - - -  when unknown', () => {
      const game = {
        expected_release_quarter: null,
        expected_release_year: null,
      } as GameProfile;
      expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('- - -');
    });
  });

  describe('formatDate', () => {
    it('should format date', () => {
      const date = new Date('2014-09-20');
      expect(Utils.formatDate(date)).toEqual('September 20, 2014');
    });
  });

  describe('loadLibrary and sort', () => {
    let gameMock0:CompleteGameProfile;
    let gameMock1:CompleteGameProfile;
    let gameMock2:CompleteGameProfile;
    let gameMock3:CompleteGameProfile;
    beforeEach(() => {
      Sinon.stub(console, 'debug');
      // creates a fresh pinia and make it active so it's automatically picked
      // up by any useStore() call without having to pass it to it:
      // `useStore(pinia)`
      setActivePinia(createPinia());

      const store = gameDexStore();

      gameMock0 = { ...libraryMock[0] } as CompleteGameProfile;
      gameMock0.name = '070 Project'; // Name beginning with a Number
      gameMock1 = { ...libraryMock[1] } as CompleteGameProfile;
      gameMock2 = { ...libraryMock[2] } as CompleteGameProfile;
      gameMock3 = { ...libraryMock[3] } as CompleteGameProfile;
      store.toggleGameInLibrary(gameMock0); // 070 Project
      store.toggleGameInLibrary(gameMock1); // Bayonetta
      store.toggleGameInLibrary(gameMock2); // Bayonetta 2
      store.toggleGameInLibrary(gameMock3); // Street Fighter
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('should flat library', () => {
      const store = gameDexStore();
      const flattenedLibrary = Utils.flatGameLibrary(store.gameLibrary);
      expect(flattenedLibrary).toEqual([gameMock0, gameMock3, gameMock2, gameMock1]);
    });

    it('should return array of letters', () => {
      const store = gameDexStore();
      const flattenedLibrary = Utils.flatGameLibrary(store.gameLibrary);
      expect(Utils.fetchFirstLetters(flattenedLibrary)).toEqual(['0', 'B', 'S']);
    });

    it('should return filtered Library', () => {
      expect(Utils.loadLibrary()).toEqual({
        '#': [gameMock0],
        B: [
          gameMock2,
          gameMock1,
        ],
        S: [gameMock3],
      });
    });
  });
});
