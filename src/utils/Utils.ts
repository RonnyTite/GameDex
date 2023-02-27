import { GameProfile } from '@/types/searchEntities.d';

export default {
  formatDate: (date:Date):string => {
    const locale = 'en-US';

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  computeReleaseDate(game:GameProfile):string {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention, max-len
      expected_release_quarter, expected_release_year, expected_release_month, expected_release_day, original_release_date,

    } = game;

    if (original_release_date !== null) {
      return this.formatDate(new Date(original_release_date));
    }
    const IsExpectedMonthExist = expected_release_month !== null && typeof expected_release_month !== 'undefined';
    const IsExpectedDayExist = expected_release_day !== null && typeof expected_release_day !== 'undefined';

    if (
      expected_release_year !== null && IsExpectedMonthExist && IsExpectedDayExist
    ) {
      const d = new Date(expected_release_year, expected_release_month - 1, expected_release_day);
      return this.formatDate(d);
    } if (
      expected_release_year !== null && expected_release_quarter !== null
    ) {
      return `Q${expected_release_quarter} ${expected_release_year}`;
    }

    return expected_release_year ? expected_release_year.toLocaleString() : '- - -';
  },
};
