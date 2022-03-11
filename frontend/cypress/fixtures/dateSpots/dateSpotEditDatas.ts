import { DateSpotTestDataType } from '../../support/types/DateSpotTestDataType';

export const dateSpotEditDatas: DateSpotTestDataType[] =[
  {
    id: 1,
    genreId: 2,
    name: "testEdit",
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
    genreId: 3,
    name: "test2Edit",
    image: {
      url: null
    },
    openingTime: "2000-01-01T11:00:00.000Z",
    closingTime: "2000-01-01T20:00:00.000Z",
    createdAt: new Date('2017/11/27 20:30'),
    updatedAt: new Date('2017/11/27 20:30')
  }
];