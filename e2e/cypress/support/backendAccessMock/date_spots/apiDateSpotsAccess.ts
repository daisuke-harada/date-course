import { AddressAndDateSpotJoinInputData } from '../../types/AddressAndDateSpotJoinDataType';

export const apiDateSpotsAccess = (addressAndDateSpotDatas :Array<AddressAndDateSpotJoinInputData>) => {
  cy.intercept('GET', 'api/v1/date_spots', (req) => {
    req.reply({addressAndDateSpots: addressAndDateSpotDatas});
  });
};