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
  prefectureId: number,
  dateSpotId: number,
  cityName: string,
  latitude: number,
  longitude: number,
};