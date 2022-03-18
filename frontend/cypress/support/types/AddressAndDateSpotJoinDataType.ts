export type AddressAndDateSpotJoinData = {
  id: number,
  cityName: string,
  prefectureId: number,
  dateSpot: DateSpotResponseData,
  genreName: string,
  latitude: number,
  longitude: number,
  reviewTotalNumber: number,
  averageRate: number,
};

export type AddressAndDateSpotJoinInputData = {
  id: number,
  cityName: string,
  prefectureId: number,
  dateSpot: DateSpotInputData,
  genreName: string,
  latitude: number,
  longitude: number,
  reviewTotalNumber: number,
  averageRate: number,
};

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
};

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
