import { AxiosPromise } from 'axios';
import {
  CompleteGameProfile, GameProfile, SearchResults, GameProfileFeed,
} from '@/types/SearchEntities.d';
import RequestManager, { BASE_URL } from './RequestManager';

export default {
  makeSearch(args:string):AxiosPromise<SearchResults<Array<GameProfile>>> {
    return RequestManager.get<SearchResults<Array<GameProfile>>>(`${BASE_URL}/search/${args}`);
  },
  fetchGameProfile(game_id:string):AxiosPromise<SearchResults<CompleteGameProfile>> {
    return RequestManager.get<SearchResults<CompleteGameProfile>>(`${BASE_URL}/game/${game_id}`);
  },
  loadHomePageFeed():AxiosPromise<SearchResults<Array<GameProfileFeed>>> {
    return RequestManager.get<SearchResults<Array<GameProfileFeed>>>(`${BASE_URL}/games`);
  },
};
