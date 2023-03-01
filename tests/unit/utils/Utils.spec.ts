import { GameProfile } from '@/types/searchEntities.d';
import Utils from '@/utils/Utils';

describe('Utils', () => {
  it('computeReleaseDate with original release date', () => {
    const game = {
      expected_release_day: 2,
      expected_release_month: 3,
      expected_release_quarter: null,
      expected_release_year: 2023,
      original_release_date: '2014-09-20',
    } as GameProfile;
    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('September 20, 2014');
  });
  it('computeReleaseDate without original release date', () => {
    const game = {
      expected_release_day: 2,
      expected_release_month: 3,
      expected_release_quarter: null,
      expected_release_year: 2023,
      original_release_date: null,
    } as GameProfile;
    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('March 2, 2023');
  });
  it('computeReleaseDate with only year', () => {
    const game = {
      expected_release_quarter: null,
      expected_release_year: 2023,
      original_release_date: null,
    } as GameProfile;

    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('2023');
  });

  it('computeReleaseDate for quarter', () => {
    const game = {
      expected_release_quarter: 2,
      expected_release_year: 2023,
    } as GameProfile;
    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('Q2 2023');
  });
  it('computeReleaseDate for quarter', () => {
    const game = {
      expected_release_quarter: null,
      expected_release_year: null,
    } as GameProfile;
    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('- - -');
  });
});
