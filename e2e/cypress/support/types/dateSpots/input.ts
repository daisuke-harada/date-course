export type DateSpotInputData = {
  id: number,
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: string,
  closingTime: string,
  createdAt: Date,
  updatedAt: Date,
}

export type AddressAndDateSpotInputData = {
  id: number,
  cityName: string,
  prefectureName: string,
  dateSpot: DateSpotInputData,
  genreName: string,
  latitude: number,
  longitude: number,
  reviewTotalNumber: number,
  averageRate: number,
};