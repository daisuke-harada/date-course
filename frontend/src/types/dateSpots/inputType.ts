export type DateSpotInput = {
  id: number
  name: string,
  genreId: number,
  image?: {
    url: string | null
  },
  openingTime: string,
  closingTime: string,
};