export type DateSpotReviewAndUserResponseData = {
  id: number,
  rate: number,
  content: string,
  userName: number,
  userGender: string,
  userId:number,
  image: {
    url: string | null
  },
  dateSpotId: number,
};