import { AxiosPromise } from 'axios';
import RequestManager, { BASE_URL } from './RequestManager';
import { CompleteGameProfile, GameProfile, SearchResults } from '../types/searchEntities.d';
// import feedMock from '@/mocks/feedMock.json';

export default {
  makeSearch(args:string):AxiosPromise<SearchResults<Array<GameProfile>>> {
    return RequestManager.get<SearchResults< Array<GameProfile>>>(`${BASE_URL}/search/${args}`);
  },
  fetchGameProfile(game_id:string):AxiosPromise<SearchResults<CompleteGameProfile>> {
    return RequestManager.get<SearchResults<CompleteGameProfile>>(`${BASE_URL}/game/${game_id}`);
  },
  loadHomePageFeed():any {
    return RequestManager.get<SearchResults< Array<GameProfile>>>(`${BASE_URL}/releases`);
    // return Promise.resolve({ data: feedMock });
  },
};
