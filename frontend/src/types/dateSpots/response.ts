export type DateSpotResponseData = {
  id: number,
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: Date,
  closingTime: Date,
  createdAt: Date,
  updatedAt: Date,
};

export type AddressResponseData = {
  id: number,
  cityName: string,
  prefectureId: number,
  dateSpotId: number,
  latitude: number,
  longitude: number,
  createdAt: Date,
  updatedAt: Date,
};

export type AddressAndDateSpotJoinData = {
  id: number,
  cityName: string,
  prefectureId: number,
  dateSpot: DateSpotResponseData,
  latitude: number,
  longitude: number,
  reviewTotalNumber: number,
  averageRate: number,
};