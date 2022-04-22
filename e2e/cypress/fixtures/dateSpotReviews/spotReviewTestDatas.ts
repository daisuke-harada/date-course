
import { DateSpotReviewAndDateSpotResponseData, DateSpotReviewAndUserResponseData } from "../../support/types/dateSpotReviews/response";
import { dateSpotTestDatas } from "../dateSpots/dateSpotTestDatas";

export const spotReviewAndDateSpotResponseDatas: DateSpotReviewAndDateSpotResponseData[] = [
  {
    id: 1,
    rate: 2,
    content: 'testtest',
    dateSpot: dateSpotTestDatas.find((dateSpot) => (dateSpot.id === 1))
  },
  {
    id: 2,
    rate: 2,
    content: 'testtest',
    dateSpot: dateSpotTestDatas.find((dateSpot) => (dateSpot.id === 2))
  },
  {
    id: 3,
    rate: 2,
    content: 'testtest',
    dateSpot: dateSpotTestDatas.find((dateSpot) => (dateSpot.id === 3))
  },
  {
    id: 4,
    rate: 2,
    content: 'testtest',
    dateSpot: dateSpotTestDatas.find((dateSpot) => (dateSpot.id === 4))
  }
];

export const spotReviewAndUserTestDatas: DateSpotReviewAndUserResponseData[] = [
  {
    id: 1,
    dateSpotId: 1,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 1,
    userImage: {url: null},
    userName: 'guest'
  },
  {
    id: 2,
    dateSpotId: 2,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 1,
    userImage: {url: null},
    userName: 'guest'
  },
  {
    id: 3,
    dateSpotId: 3,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 1,
    userImage: {url: null},
    userName: 'guest'
  },
  {
    id: 4,
    dateSpotId: 4,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 1,
    userImage: {url: null},
    userName: 'guest'
  },
  {
    id: 5,
    dateSpotId: 1,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 2,
    userImage: {url: null},
    userName: 'daisuke'
  },
  {
    id: 6,
    dateSpotId: 2,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 2,
    userImage: {url: null},
    userName: 'daisuke'
  },
  {
    id: 7,
    dateSpotId: 3,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 2,
    userImage: {url: null},
    userName: 'daisuke'
  },
  {
    id: 8,
    dateSpotId: 4,
    content: 'testtest',
    rate: 2,
    userGender: '男性',
    userId: 2,
    userImage: {url: null},
    userName: 'daisuke'
  },
  {
    id: 9,
    dateSpotId: 1,
    content: 'testtest',
    rate: 2,
    userGender: '女性',
    userId: 3,
    userImage: {url: null},
    userName: 'marika'
  },
  {
    id: 10,
    dateSpotId: 2,
    content: 'testtest',
    rate: 2,
    userGender: '女性',
    userId: 3,
    userImage: {url: null},
    userName: 'marika'
  },
  {
    id: 11,
    dateSpotId: 3,
    content: 'testtest',
    rate: 2,
    userGender: '女性',
    userId: 3,
    userImage: {url: null},
    userName: 'marika'
  },
  {
    id: 12,
    dateSpotId: 4,
    content: 'testtest',
    rate: 2,
    userGender: '女性',
    userId: 3,
    userImage: {url: null},
    userName: 'marika'
  }
];