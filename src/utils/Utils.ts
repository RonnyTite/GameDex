import { GameProfile, GameProfileFeed } from '@/types/searchEntities.d';
import libraryMock from '@/mocks/libraryMock.json';

export interface TodayDate {
  day: number
  month: number
  year: number
  fullDate: string
}

export default {
  formatDate: (date:Date):string => {
    const locale = 'en-US';

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  isGameprofile(data:GameProfile | GameProfileFeed):data is GameProfile {
    return data ? 'release_date' in data : false;
  },
  computeReleaseDate(game:GameProfile | GameProfileFeed):string {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention, max-len
      expected_release_quarter, expected_release_year, expected_release_month, expected_release_day,
    } = game;

    let releaseDate = game.original_release_date;

    if (this.isGameprofile(game)) {
      releaseDate = game.original_release_date || (game.release_date || null);
    }

    if (releaseDate) {
      return this.formatDate(new Date(releaseDate));
    }
    const IsExpectedMonthExist = expected_release_month !== null && typeof expected_release_month !== 'undefined';
    const IsExpectedDayExist = expected_release_day !== null && typeof expected_release_day !== 'undefined';

    if (
      expected_release_year !== null && IsExpectedMonthExist && IsExpectedDayExist
    ) {
      const d = new Date(expected_release_year, expected_release_month - 1, expected_release_day);
      return this.formatDate(d);
    }

    if (
      expected_release_year !== null && expected_release_quarter !== null
    ) {
      return `Q${expected_release_quarter} ${expected_release_year}`;
    }

    return expected_release_year ? expected_release_year.toString() : '- - -';
  },
  computeTodayDate():TodayDate {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      fullDate: this.formatDate(date),
    };
  },
  loadLibraryFromStore():Array<GameProfile> {
    return libraryMock as Array<GameProfile>;
  },

};
