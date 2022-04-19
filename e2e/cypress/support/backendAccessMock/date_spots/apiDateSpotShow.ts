import { AddressAndDateSpotInputData } from "../../types/dateSpots/input";

export const apiDateSpotShow = (addressAndDateSpotData: AddressAndDateSpotInputData) => {
  cy.intercept('GET', `api/v1/date_spots/${addressAndDateSpotData.dateSpot.id}`,  (req) => {
    req.reply({addressAndDateSpot: addressAndDateSpotData, reviewAverageRate: 0, dateSpotReviews: []});
  });
};