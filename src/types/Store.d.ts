import { CompleteGameProfile } from './SearchEntities.d';

export type GameLibrary = {
  [x:string]: CompleteGameProfile
};
// eslint-disable-next-line max-len
export type FilterProperties = '#' | 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
// Had to do a partial to make properties optionnal https://stackoverflow.com/q/53276792
export type SortedLibrary = Partial<Record<FilterProperties, Array<CompleteGameProfile | never>>>;
