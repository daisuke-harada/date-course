export type DateSpotResponseData = {
  id: number
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: Date,
  closingTime: Date,
  createdAt: Date,
  updatedAt: Date,
};