import { AddressAndDateSpotInputData } from './../../support/types/dateSpots/input';



export const addressAndDateSpotDatas: AddressAndDateSpotInputData[] =[
  {
    id: 1,
    prefectureName: '福岡',
    genreName: 'ショッピングモール',
    dateSpot: {
      id: 1,
      genreId: 1,
      name: "test",
      image: {
        url: null
      },
      openingTime: "2000-01-01T11:00:00.000Z",
      closingTime: "2000-01-01T20:00:00.000Z",
      createdAt: new Date('2017/11/27 20:30'),
      updatedAt: new Date('2017/11/27 20:30')
    },
    cityName: "福岡市南区長丘5丁目18-10-306",
    latitude: 33.5544,
    longitude: 130.389,
    reviewTotalNumber: 0,
    averageRate: 0,
  },
  {
    id: 2,
    prefectureName: '福岡',
    genreName: 'ショッピングモール',
    dateSpot: {
      id: 2,
      genreId: 2,
      name: "test2",
      image: {
        url: null
      },
      openingTime: "2000-01-01T11:00:00.000Z",
      closingTime: "2000-01-01T20:00:00.000Z",
      createdAt: new Date('2017/11/27 20:30'),
      updatedAt: new Date('2017/11/27 20:30')
    },
    cityName: "福岡市博多区住吉1丁目2",
    latitude: 33.5544,
    longitude: 130.389,
    reviewTotalNumber: 0,
    averageRate: 0,
  }
];