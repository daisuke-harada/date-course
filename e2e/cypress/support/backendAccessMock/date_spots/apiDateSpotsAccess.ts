import { AddressAndDateSpotInputData } from "../../types/dateSpots/input";


export const apiDateSpotsAccess = (addressAndDateSpotDatas :AddressAndDateSpotInputData[]) => {
  cy.intercept('GET', 'api/v1/date_spots', (req) => {
    req.reply({addressAndDateSpots: addressAndDateSpotDatas});
  });
};