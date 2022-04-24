import { AddressAndDateSpotJoinData } from "../../types/dateSpots/response";

export const apiGenreShowAccess = (genreId: number, addressAndDateSpots: AddressAndDateSpotJoinData[]) => {
  const genreDateSpots = addressAndDateSpots.filter(
    (addressAndDateSpot) => (addressAndDateSpot.dateSpot.genreId === genreId)
  );


  cy.intercept('GET', `api/v1/genres/${genreId}`, (req) => {
    req.reply({addressAndDateSpots: genreDateSpots});
  });
}