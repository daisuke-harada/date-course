import { DateSpotTestDataType } from '../../types/DateSpotTestDataType';

export const apiDateSpotCreateAccess = (dateSpotData: DateSpotTestDataType) => {
  cy.intercept('POST', 'api/v1/date_spots',  (req) => {
    req.reply({status: 'created', dateSpot: dateSpotData});
  });
};