export type DateSpotTestDataType = {
  id: number,
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: string,
  closingTime: string,
  createdAt: Date,
  updatedAt: Date,
};
