import { AxiosPromise } from 'axios';
import RequestManager from './RequestManager';
import { SearchResults } from '../types/searchEntities.d';

export default {
  makeSearch(args:string):AxiosPromise<SearchResults> {
    return RequestManager.get<SearchResults>(args);
  },
};
