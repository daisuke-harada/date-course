export type DateSpotInput = {
  id: number
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: string,
  closingTime: string,
};

export type AddressInput = {
  id: number,
  prefecture_id: number,
  date_spot_id: number,
  city_name: string,
  latitude: number,
  longitude: number,
};