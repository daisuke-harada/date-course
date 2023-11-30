import { defaultDateSpotData } from './defaultDateSpotData';
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const defaultAddressAndDateSpotJoinData: AddressAndDateSpotJoinData = {
  id: 0,
  cityName: '',
  prefectureName: '',
  dateSpot: defaultDateSpotData,
  genreName: '',
  latitude: 0,
  longitude: 0,
  reviewTotalNumber: 0,
  averageRate: 0,
}