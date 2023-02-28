// eslint-disable-next-line import/no-extraneous-dependencies
import sinon, { SinonStub } from 'sinon';
import GiantBombApi from '../../../src/scripts/GiantBombApi';
import { axiosInstance } from '../../../src/scripts/RequestManager';

describe('Api routes', () => {
  let axiosMock:SinonStub;
  beforeEach(() => {
    axiosMock = sinon.stub(axiosInstance, 'get').resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });
  it('check URL request for search', () => GiantBombApi.makeSearch('bayo')
    .then(() => {
      // sinon.assert.calledOnceWithExactly(axiosMock, `${BASE_URL}/search/bayo`);
      const url = axiosMock.getCall(0).args[0];
      expect(url).toMatch('/search/bayo');
    }));

  it('check URL request for game profile', () => GiantBombApi.fetchGameProfile('12404')
    .then(() => {
      const url = axiosMock.getCall(0).args[0];
      expect(url).toMatch('/game/12404');
    }));

  it('check URL request for hom feed releases', () => GiantBombApi.loadHomePageFeed()
    .then(() => {
      const url = axiosMock.getCall(0).args[0];
      expect(url).toMatch('/releases');
    }));
});
