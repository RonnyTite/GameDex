import { mount } from '@vue/test-utils';
import Sinon, { SinonStub, SinonSpy } from 'sinon';
import HomePage from '@/views/HomePage.vue';
import searchResults from '@/mocks/searchRequestResultsMock.json';
import GiantBombApi from '@/scripts/GiantBombApi';
import { axiosInstance } from '@/scripts/RequestManager';

describe('HomePage.vue', () => {
  let axiosMock:SinonStub;
  let loadHomePageFeedSpy:SinonSpy;
  const searchResultsStub = ({
    data: { results: searchResults.results },
  });
  beforeEach(() => {
    axiosMock = Sinon.stub(axiosInstance, 'get').resolves(searchResultsStub);
    loadHomePageFeedSpy = Sinon.spy(GiantBombApi, 'loadHomePageFeed');
  });
  afterEach(() => {
    Sinon.restore();
  });
  it('filter', () => {
    const wrapper = mount(HomePage);

    Sinon.assert.calledOnceWithExactly(loadHomePageFeedSpy);
    Sinon.assert.calledOnce(axiosMock);

    const filtered = wrapper.vm.filteringFeedResults(searchResults.results);
    const results = [{
      // eslint-disable-next-line max-len
      deck: 'Bayonetta is a "non-stop action game" from PlatinumGames.  The titular character is a witch who can use hair-based magic, as well as firearms attached to her feet, to battle fallen angels and other foes.',
      expected_release_quarter: null,
      expected_release_year: null,
      id: 20710,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/1/13158/1124551-gb.png', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/1/13158/1124551-gb.png', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/1/13158/1124551-gb.png', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/1/13158/1124551-gb.png', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/1/13158/1124551-gb.png', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/1/13158/1124551-gb.png', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/1/13158/1124551-gb.png', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/1/13158/1124551-gb.png', original_url: 'https://www.giantbomb.com/a/uploads/original/1/13158/1124551-gb.png', image_tags: 'All Images,Box Art',
      },
      name: 'Bayonetta',
      original_release_date: '2009-10-29',
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-20/', id: 20, name: 'Xbox 360', site_detail_url: 'https://www.giantbomb.com/xbox-360/3045-20/', abbreviation: 'X360',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-35/', id: 35, name: 'PlayStation 3', site_detail_url: 'https://www.giantbomb.com/playstation-3/3045-35/', abbreviation: 'PS3',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-88/', id: 88, name: 'PlayStation Network (PS3)', site_detail_url: 'https://www.giantbomb.com/playstation-network-ps3/3045-88/', abbreviation: 'PS3N',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-94/', id: 94, name: 'PC', site_detail_url: 'https://www.giantbomb.com/pc/3045-94/', abbreviation: 'PC',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-139/', id: 139, name: 'Wii U', site_detail_url: 'https://www.giantbomb.com/wii-u/3045-139/', abbreviation: 'WiiU',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-145/', id: 145, name: 'Xbox One', site_detail_url: 'https://www.giantbomb.com/xbox-one/3045-145/', abbreviation: 'XONE',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-146/', id: 146, name: 'PlayStation 4', site_detail_url: 'https://www.giantbomb.com/playstation-4/3045-146/', abbreviation: 'PS4',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-157/', id: 157, name: 'Nintendo Switch', site_detail_url: 'https://www.giantbomb.com/nintendo-switch/3045-157/', abbreviation: 'NSW',
      }],
      resource_type: 'game',
    }, {
      deck: 'The third entry in the Bayonetta series comes to Nintendo Switch.',
      expected_release_quarter: null,
      expected_release_year: null,
      id: 63119,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/33/338034/3390441-5022830650-Game-.jpg', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/33/338034/3390441-5022830650-Game-.jpg', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/33/338034/3390441-5022830650-Game-.jpg', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/33/338034/3390441-5022830650-Game-.jpg', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/33/338034/3390441-5022830650-Game-.jpg', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/33/338034/3390441-5022830650-Game-.jpg', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/33/338034/3390441-5022830650-Game-.jpg', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/33/338034/3390441-5022830650-Game-.jpg', original_url: 'https://www.giantbomb.com/a/uploads/original/33/338034/3390441-5022830650-Game-.jpg', image_tags: 'All Images',
      },
      name: 'Bayonetta 3',
      original_release_date: '2022-10-28',
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-157/', id: 157, name: 'Nintendo Switch', site_detail_url: 'https://www.giantbomb.com/nintendo-switch/3045-157/', abbreviation: 'NSW',
      }],
      resource_type: 'game',
    }, {
      // eslint-disable-next-line max-len
      deck: 'The sequel to the critically-acclaimed action brawler Bayonetta, this time with a two-player online co-op mode and exclusive to the Nintendo Wii U.',
      expected_release_quarter: null,
      expected_release_year: null,
      id: 39764,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/8/82063/2646645-bayo2.jpg', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/8/82063/2646645-bayo2.jpg', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/8/82063/2646645-bayo2.jpg', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/8/82063/2646645-bayo2.jpg', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/8/82063/2646645-bayo2.jpg', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/8/82063/2646645-bayo2.jpg', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/8/82063/2646645-bayo2.jpg', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/8/82063/2646645-bayo2.jpg', original_url: 'https://www.giantbomb.com/a/uploads/original/8/82063/2646645-bayo2.jpg', image_tags: 'All Images,Box Art',
      },
      name: 'Bayonetta 2',
      original_release_date: '2014-09-20',
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-139/', id: 139, name: 'Wii U', site_detail_url: 'https://www.giantbomb.com/wii-u/3045-139/', abbreviation: 'WiiU',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-157/', id: 157, name: 'Nintendo Switch', site_detail_url: 'https://www.giantbomb.com/nintendo-switch/3045-157/', abbreviation: 'NSW',
      }],
      resource_type: 'game',
    }, {
      deck: 'A prequel to the Bayonetta series focusing on Cereza before she became the titular witch.',
      expected_release_quarter: null,
      expected_release_year: 2023,
      id: 88068,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/33/338034/3444389-7450080477-1x1_N.jpg', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/33/338034/3444389-7450080477-1x1_N.jpg', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/33/338034/3444389-7450080477-1x1_N.jpg', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/33/338034/3444389-7450080477-1x1_N.jpg', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/33/338034/3444389-7450080477-1x1_N.jpg', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/33/338034/3444389-7450080477-1x1_N.jpg', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/33/338034/3444389-7450080477-1x1_N.jpg', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/33/338034/3444389-7450080477-1x1_N.jpg', original_url: 'https://www.giantbomb.com/a/uploads/original/33/338034/3444389-7450080477-1x1_N.jpg', image_tags: 'All Images',
      },
      name: 'Bayonetta Origins: Cereza and the Lost Demon',
      original_release_date: null,
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-157/', id: 157, name: 'Nintendo Switch', site_detail_url: 'https://www.giantbomb.com/nintendo-switch/3045-157/', abbreviation: 'NSW',
      }],
      resource_type: 'game',
    }, {
      deck: 'Remastered versions of two PlatinumGames classics on one disc.',
      expected_release_quarter: null,
      expected_release_year: null,
      id: 77235,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/16/164924/3168256-bayonish.png', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/16/164924/3168256-bayonish.png', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/16/164924/3168256-bayonish.png', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/16/164924/3168256-bayonish.png', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/16/164924/3168256-bayonish.png', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/16/164924/3168256-bayonish.png', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/16/164924/3168256-bayonish.png', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/16/164924/3168256-bayonish.png', original_url: 'https://www.giantbomb.com/a/uploads/original/16/164924/3168256-bayonish.png', image_tags: 'All Images,Box art',
      },
      name: 'Bayonetta/Vanquish 10th Anniversary Bundle',
      original_release_date: '2020-02-18',
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-145/', id: 145, name: 'Xbox One', site_detail_url: 'https://www.giantbomb.com/xbox-one/3045-145/', abbreviation: 'XONE',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-146/', id: 146, name: 'PlayStation 4', site_detail_url: 'https://www.giantbomb.com/playstation-4/3045-146/', abbreviation: 'PS4',
      }],
      resource_type: 'game',
    }, {
      deck: 'A retro style game featuring Bayonetta.',
      expected_release_quarter: null,
      expected_release_year: 2015,
      id: 58980,
      image: {
        icon_url: 'https://www.giantbomb.com/a/uploads/square_avatar/10/103881/2929450-8-bit%20bayonetta.jpg', medium_url: 'https://www.giantbomb.com/a/uploads/scale_medium/10/103881/2929450-8-bit%20bayonetta.jpg', screen_url: 'https://www.giantbomb.com/a/uploads/screen_medium/10/103881/2929450-8-bit%20bayonetta.jpg', screen_large_url: 'https://www.giantbomb.com/a/uploads/screen_kubrick/10/103881/2929450-8-bit%20bayonetta.jpg', small_url: 'https://www.giantbomb.com/a/uploads/scale_small/10/103881/2929450-8-bit%20bayonetta.jpg', super_url: 'https://www.giantbomb.com/a/uploads/scale_large/10/103881/2929450-8-bit%20bayonetta.jpg', thumb_url: 'https://www.giantbomb.com/a/uploads/scale_avatar/10/103881/2929450-8-bit%20bayonetta.jpg', tiny_url: 'https://www.giantbomb.com/a/uploads/square_mini/10/103881/2929450-8-bit%20bayonetta.jpg', original_url: 'https://www.giantbomb.com/a/uploads/original/10/103881/2929450-8-bit%20bayonetta.jpg', image_tags: 'All Images',
      },
      name: '8-Bit Bayonetta',
      original_release_date: null,
      platforms: [{
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-94/', id: 94, name: 'PC', site_detail_url: 'https://www.giantbomb.com/pc/3045-94/', abbreviation: 'PC',
      }, {
        api_detail_url: 'https://www.giantbomb.com/api/platform/3045-140/', id: 140, name: 'Browser', site_detail_url: 'https://www.giantbomb.com/browser/3045-140/', abbreviation: 'BROW',
      }],
      resource_type: 'game',
    }];

    expect(filtered).toEqual(results);
  });
});

describe('HomePage.vue', () => {
  let wrapper;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore test are OK doesnt want all values just for the test
    Sinon.stub(GiantBombApi, 'loadHomePageFeed').resolves({ data: { results: searchResults.results } });
  });
  afterEach(() => {
    Sinon.restore();
  });
  it('receive emits and open gamecard', () => {
    wrapper = mount(HomePage);
    wrapper.vm.openGameCard(searchResults.results[0]);
    expect(wrapper.vm.modalGameId).toEqual(searchResults.results[0].id.toString());
    expect(wrapper.vm.isGameCardModalOpen).toEqual(true);
  });
  it('receive emits and close gamecard', () => {
    wrapper = mount(HomePage);
    wrapper.vm.closeGameCard();
    expect(wrapper.vm.modalGameId).toEqual('');
    expect(wrapper.vm.isGameCardModalOpen).toEqual(false);
  });
});
