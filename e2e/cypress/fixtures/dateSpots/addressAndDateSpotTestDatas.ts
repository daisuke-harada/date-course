import { AddressAndDateSpotJoinData } from "../../support/types/dateSpots/response";
import { dateSpotTestDatas } from "./DateSpotTestDatas";

export const addressAndDateSpotTestDatas: AddressAndDateSpotJoinData[] = [
  {
    averageRate: 3.3,
    cityName: "福岡県福岡市中央区大名1-11-22-1",
    dateSpot: dateSpotTestDatas[1],
    genreName: "居酒屋",
    id: 2,
    latitude: 33.5873,
    longitude: 130.395,
    prefectureName: "福岡県",
    reviewTotalNumber: 3
  },
  {
    averageRate: 3.1,
    cityName: "福岡県福岡市中央区大濠公園",
    dateSpot: dateSpotTestDatas[2],
    genreName: "公園",
    id: 3,
    latitude: 33.5898,
    longitude: 130.375,
    prefectureName: "福岡県",
    reviewTotalNumber: 3
  },
  {
    averageRate: 2.7,
    cityName: "福岡県福岡市博多区住吉1丁目2",
    dateSpot: dateSpotTestDatas[0],
    genreName: "ショッピングモール",
    id: 1,
    latitude: 33.5894,
    longitude: 130.411,
    prefectureName: "福岡県",
    reviewTotalNumber: 3
  },
  {
    averageRate: 2.7,
    cityName: "千葉県墨田区押上1-1-2",
    dateSpot: dateSpotTestDatas[3],
    genreName: "遊園地",
    id: 4,
    latitude: 35.7103,
    longitude: 139.811,
    prefectureName: "千葉県",
    reviewTotalNumber: 3
  }
]