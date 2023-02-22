import { AxiosPromise } from 'axios';
import RequestManager, { BASE_URL } from './RequestManager';
import { GameProfile, SearchResults } from '../types/searchEntities.d';

export default {
  makeSearch(args:string):AxiosPromise<SearchResults> {
    return RequestManager.get<SearchResults>(`${BASE_URL}/search?${args}`);
  },
  fetchGameProfile(game_id:string):AxiosPromise<GameProfile> {
    return RequestManager.get<GameProfile>(`${BASE_URL}/game?${game_id}`);
  },
};
