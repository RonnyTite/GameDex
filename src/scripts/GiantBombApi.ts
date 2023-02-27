import { AxiosPromise } from 'axios';
import RequestManager, { BASE_URL } from './RequestManager';
import { CompleteGameProfile, SearchResults } from '../types/searchEntities.d';

export default {
  makeSearch(args:string):AxiosPromise<SearchResults> {
    return RequestManager.get<SearchResults>(`${BASE_URL}/search/${args}`);
  },
  fetchGameProfile(game_id:string):AxiosPromise<CompleteGameProfile> {
    return RequestManager.get<CompleteGameProfile>(`${BASE_URL}/game/${game_id}`);
  },
  loadHomePageFeed():Promise<void> { return Promise.resolve(); },
};
