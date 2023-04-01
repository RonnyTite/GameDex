import { CompleteGameProfile, GameProfile, GameProfileFeed } from '@/types/searchEntities';
import { GameLibrary, SortedLibrary } from '@/types/Store.d';
import GameDexStore from '@/store/Store';
// import libraryMock from '@/mocks/libraryMock.json';

export interface TodayDate {
  day: number
  month: number
  year: number
  fullDate: string
}

export default {
  formatDate: (date: Date): string => {
    const locale = 'en-US';

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  isGameprofile(data: GameProfile | GameProfileFeed): data is GameProfile {
    return data ? 'release_date' in data : false;
  },
  computeReleaseDate(game: GameProfile | GameProfileFeed): string {
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
  computeTodayDate(): TodayDate {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      fullDate: this.formatDate(date),
    };
  },
  /**
   * @description create an Array with one iteration of first letters only , no duplicates
   */
  fetchFirstLetters(rawLibrary: Array<CompleteGameProfile>): Array<string> {
    return [...new Set( // new Set to avoid duplicate
      rawLibrary
        .sort((a, b) => b.name.localeCompare(a.name)) // sort by unalphabetical order
        .map((game) => game.name.charAt(0)), // make array of first letter;
    )];
  },
  flatGameLibrary(rawLibrary: GameLibrary | SortedLibrary):Array<CompleteGameProfile> {
    return Object.values(rawLibrary).flat();
  },
  organizeFlattenedLibraryAsGameLibrary(flattenedLibrary:Array<CompleteGameProfile >):SortedLibrary {
    const filterLetters = this.fetchFirstLetters(flattenedLibrary);

    let sortedlibrary: SortedLibrary = {};
    // as filterLetters is in unalphabetical order , this will be sorted in alphabetical order
    filterLetters.forEach((letter) => {
      const filteredGames = Object.values(flattenedLibrary).filter((game) => game.name.charAt(0) === letter);

      const nonLetterRegex = /[^a-zA-Z]+/g;
      const property = letter.match(nonLetterRegex) ? '#' : letter;

      sortedlibrary = {
        [property]: filteredGames,
        ...sortedlibrary,
      };
    });

    Object.values(sortedlibrary).forEach((data) => {
      data.sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically each results
    });

    const results = typeof sortedlibrary['#'] !== 'undefined' ? { '#': sortedlibrary['#'] } : {};
    delete sortedlibrary['#'];

    return { ...results, ...sortedlibrary };
  },
  loadLibrary(): SortedLibrary {
    const store = GameDexStore();
    // // @todo to be removed
    // const gameMock0 = libraryMock[0] as CompleteGameProfile;
    // const gameMock1 = libraryMock[1] as CompleteGameProfile;
    // const gameMock2 = libraryMock[2] as CompleteGameProfile;
    // const gameMock3 = libraryMock[3] as CompleteGameProfile;
    // store.toggleGameInLibrary(gameMock0);
    // store.toggleGameInLibrary(gameMock1); // Bayonetta
    // store.toggleGameInLibrary(gameMock2); // Bayonetta 2
    // store.toggleGameInLibrary(gameMock3); // Street Fighter

    const rawLibrary = { ...store.gameLibrary };
    const flattenedLibrary = this.flatGameLibrary(rawLibrary);

    return this.organizeFlattenedLibraryAsGameLibrary(flattenedLibrary);
  },
  /**
   * @description Fetch game from store if exists ELSE load it from GiantBomb
   */
  loadGame(gameId:string):Promise<CompleteGameProfile | Array<never>> {
    const store = GameDexStore();

    const existsInStore = this.isAlreadySaved(gameId);

    if (existsInStore) {
      return Promise.resolve(store.gameLibrary[gameId]);
    }
    return Promise.resolve([]);
  },
  isAlreadySaved(gameId:string): boolean {
    const store = GameDexStore();

    return !!store.gameLibrary[gameId];
  },
};
