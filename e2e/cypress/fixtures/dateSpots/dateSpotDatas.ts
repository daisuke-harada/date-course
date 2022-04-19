import { DateSpotInputData } from "../../support/types/dateSpots/input";

export const dateSpotDatas: DateSpotInputData[] =[
  {
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
  {
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

  }
];