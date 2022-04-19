import { DateSpotInputData } from "../../types/dateSpots/input";

export const apiDateSpotUpdateAccess = (dateSpotData: DateSpotInputData) => {
  cy.intercept('PUT', `api/v1/date_spots/${dateSpotData.id}`,  (req) => {
    req.reply({status: 'updated', dateSpot: dateSpotData});
  });
};