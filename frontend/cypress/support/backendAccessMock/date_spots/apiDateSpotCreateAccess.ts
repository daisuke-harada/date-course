import { DateSpotInput } from "../../../../src/types/dateSpots/inputType";

export const apiDateSpotCreateAccess = (dateSpotData: DateSpotInput) => {
  cy.intercept('POST', 'api/v1/date_spots',  (req) => {
    req.reply({status: 'created', dateSpot: dateSpotData});
  });
};