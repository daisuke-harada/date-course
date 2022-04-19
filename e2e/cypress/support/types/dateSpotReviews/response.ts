import { DateSpotResponseData } from '../dateSpots/response';
export type DateSpotReviewAndUserResponseData = {
  id: number,
  rate: number,
  content: string,
  userName: string,
  userGender: string,
  userId:number,
  userImage: {
    url: string | null
  },
  dateSpotId: number,
};

export type DateSpotReviewAndDateSpotResponseData = {
  id: number,
  rate: number,
  content: string,
  dateSpot: DateSpotResponseData
}