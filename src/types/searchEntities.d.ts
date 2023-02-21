export interface SearchResults {
  [x:string]: Array<GameProfile>
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

export interface GamePlatform {
  api_detail_url:string
  id:number,
  name:string
  site_detail_url:string
  abbreviation:string
}
