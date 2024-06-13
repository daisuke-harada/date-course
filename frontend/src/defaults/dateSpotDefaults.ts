import { DateSpotResponseData, AddressResponseData, AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const initialDateSpot: DateSpotResponseData = {
  id: 0,
  name: '',
  genreId: 0,
  image: {
    url: null
  },
  openingTime: new Date(),
  closingTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialAddress: AddressResponseData = {
  id: 0,
  cityName: '',
  prefectureId: 0,
  dateSpotId: 0,
  latitude: 0,
  longitude: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialAddressAndDateSpotJoin: AddressAndDateSpotJoinData = {
  id: 0,
  cityName: '',
  prefectureName: '',
  dateSpot: initialDateSpot,
  genreName: '',
  latitude: 0,
  longitude: 0,
  reviewTotalNumber: 0,
  averageRate: 0,
};