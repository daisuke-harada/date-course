import { DateSpotInputData } from '../../types/dateSpots/input';

export const apiDateSpotCreateAccess = (dateSpotData: DateSpotInputData) => {
  cy.intercept('POST', 'api/v1/date_spots',  (req) => {
    req.reply({status: 'created', dateSpot: dateSpotData});
  });
};