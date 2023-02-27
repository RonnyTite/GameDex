import Utils from '../../../src/utils/Utils';
import searchMockJson from '@/mocks/searchRequestResultsMock.json';
import { GameProfile } from '@/types/searchEntities.d';

describe('Utils', () => {
  const [game,,,gameWithOnlyYear] = searchMockJson.results as Array<GameProfile>;
  it('computeReleaseDate', () => {
    expect(Utils.computeReleaseDate.call(Utils, game)).toEqual('October 29, 2009');
  });
  it('computeReleaseDate', () => {
    expect(Utils.computeReleaseDate.call(Utils, gameWithOnlyYear)).toEqual('2 023');
  });
});
