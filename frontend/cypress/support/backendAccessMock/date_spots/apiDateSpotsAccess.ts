import { addressAndDateSpotDatas } from './../../../fixtures/dateSpots/addressAndDateSpotDatas';

export const apiDateSpotsAccess = () => {
  cy.intercept('GET', 'api/v1/date_spots', (req) => {
    req.reply({addressAndDateSpotDatas});
  });
};