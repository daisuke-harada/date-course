import { anotherTestUser, guestUser } from '../users/response';
import { CourseResponseData } from "../../support/types/courses/response";
import { addressAndDateSpotTestDatas } from "../dateSpots/addressAndDateSpotTestDatas";
import { testUser } from "../users/response";
import { AddressAndDateSpotJoinData } from '../../support/types/dateSpots/response';

const firstDuringSpots = [addressAndDateSpotTestDatas[0], addressAndDateSpotTestDatas[1], addressAndDateSpotTestDatas[2]];
const secondDuringSpots = [addressAndDateSpotTestDatas[4], addressAndDateSpotTestDatas[5], addressAndDateSpotTestDatas[3]];
const thirdDuringSpots = [addressAndDateSpotTestDatas[0], addressAndDateSpotTestDatas[1], addressAndDateSpotTestDatas[6]];

const createNoDuplicatePrefecture = (dateSpots: AddressAndDateSpotJoinData[]) => {
  return Array.from(new Set(dateSpots.map((dateSpot) => dateSpot.prefectureName)))
};

export const courseTestDatas: CourseResponseData[] = [
  {
    id: 1,
    user: testUser,
    travelMode: 'DRIVING',
    authority: '公開',
    courseDuringSpots: firstDuringSpots,
    noDuplicatePrefectureNames: createNoDuplicatePrefecture(firstDuringSpots)
  },
  {
    id: 2,
    user: testUser,
    travelMode: 'DRIVING',
    authority: '公開',
    courseDuringSpots: secondDuringSpots,
    noDuplicatePrefectureNames: createNoDuplicatePrefecture(secondDuringSpots)
  },
  {
    id: 3,
    user: guestUser,
    travelMode: 'BICYCLING',
    authority: '公開',
    courseDuringSpots: firstDuringSpots,
    noDuplicatePrefectureNames: createNoDuplicatePrefecture(firstDuringSpots)
  },
  {
    id: 4,
    user: anotherTestUser,
    travelMode: 'DRIVING',
    authority: '公開',
    courseDuringSpots: thirdDuringSpots,
    noDuplicatePrefectureNames: createNoDuplicatePrefecture(thirdDuringSpots)
  }
]