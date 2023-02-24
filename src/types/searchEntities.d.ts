export interface SearchResults {
  error: 'OK' | 'KO'
  limit: number
  offset: number
  number_of_page_results: number
  number_of_total_results: number
  status_code: number
  results: Array<GameProfile>
  version: string
}

export interface GameProfile {
  api_detail_url:string,
  deck:string,
  expected_release_quarter: string | null,
  expected_release_year: string | null,
  id:number,
  image:GameImages
  name:string,
  original_release_date:string,
  platforms: Array<GamePlatform>
  resource_type: string
}

export interface GameImages {
  icon_url:string
  medium_url:string
  screen_url:string
  screen_large_url:string
  small_url:string
  super_url:string
  thumb_url:string
  tiny_url:string
  original_url:string
  image_tags:string
}

export interface GamePlatform extends GameDetails {
  abbreviation:string
}

export interface GameDetails {
  api_detail_url:string
  id:number,
  name:string
  site_detail_url:string
}
interface GameRating {
  api_detail_url:string
  id:number,
  name:string
}

export interface CompleteGameProfile extends GameProfile {
  description: string,
  expected_release_day: null,
  expected_release_month: null,
  number_of_user_reviews: number,
  original_game_rating: Array<GameRating>
  videos: Array<GameDetails>
  developers:Array<GameDetails>
  genres: Array<GameDetails>
  publishers: Array<GameDetails>
  releases: Array<GameDetails>
  similar_games: Array<GameDetails>
}
