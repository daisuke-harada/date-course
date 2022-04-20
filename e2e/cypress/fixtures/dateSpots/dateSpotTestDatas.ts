import { DateSpotResponseData } from "../../support/types/dateSpots/response";

export const dateSpotTestDatas: DateSpotResponseData[] = [
  {
    id: 1,
    genreId: 1,
    name: "キャナルシティ博多",
    image: {
      url: null
    },
    openingTime: new Date('2000/01/01 08:00'),
    closingTime: new Date('2000/01/01 23:00'),
    createdAt: new Date('2022/04/15'),
    updatedAt: new Date('2022/04/15'),
  },
  {
    id: 2,
    genreId: 8,
    name: "つなぐダイニング ZINO 天神店",
    image: {
      url: null
    },
    openingTime: new Date('2000/01/01 08:00'),
    closingTime: new Date('2000/01/01 23:00'),
    createdAt: new Date('2022/04/15'),
    updatedAt: new Date('2022/04/15'),
  },
  {
    id: 3,
    genreId: 12,
    name: "大濠公園",
    image: {
      url: null
    },
    createdAt: new Date('2022/04/15'),
    updatedAt: new Date('2022/04/15'),
  },
  {
    id: 4,
    genreId: 5,
    name: "東京ディズニーランド",
    image: {
      url: null
    },
    openingTime: new Date('2000/01/01 08:00'),
    closingTime: new Date('2000/01/01 22:00'),
    createdAt: new Date('2022/04/15'),
    updatedAt: new Date('2022/04/15'),
  }
];