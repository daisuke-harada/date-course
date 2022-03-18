import { AddressAndDateSpotJoinInputData } from './../../types/AddressAndDateSpotJoinDataType';

export const apiDateSpotShow = (addressAndDateSpotData: AddressAndDateSpotJoinInputData) => {
  cy.intercept('GET', `api/v1/date_spots/${addressAndDateSpotData.dateSpot.id}`,  (req) => {
    req.reply({addressAndDateSpot: addressAndDateSpotData, reviewAverageRate: 0, dateSpotReviews: []});
  });
};