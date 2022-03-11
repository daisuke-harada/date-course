import { DateSpotTestDataType } from "../../types/DateSpotTestDataType";

export const apiDateSpotUpdateAccess = (dateSpotData: DateSpotTestDataType) => {
  cy.intercept('PUT', `api/v1/date_spots/${dateSpotData.id}`,  (req) => {
    req.reply({status: 'updated', dateSpot: dateSpotData});
  });
};