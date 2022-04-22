import { addressAndDateSpotTestDatas } from './../../../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { AddressAndDateSpotJoinData, DateSpotResponseData } from "../../types/dateSpots/response";
import { spotReviewAndUserTestDatas } from '../../../fixtures/dateSpotReviews/spotReviewTestDatas';


export const apiDateSpotCreateAccess = (dateSpotData: DateSpotResponseData) => {
  cy.intercept('POST', 'api/v1/date_spots', (req) => {
    req.reply({ status: 'created', dateSpot: dateSpotData });
  });
};

export const apiDateSpotShowAccess = (addressAndDateSpotTestData: AddressAndDateSpotJoinData) => {
  cy.intercept('GET', `api/v1/date_spots/${addressAndDateSpotTestData.dateSpot.id}`, (req) => {
    const dateSpotReviews = spotReviewAndUserTestDatas.filter((review) => review.dateSpotId === addressAndDateSpotTestData.dateSpot.id);
    req.reply({
      addressAndDateSpot: addressAndDateSpotTestData,
      reviewAverageRate: addressAndDateSpotTestData.averageRate,
      dateSpotReviews: dateSpotReviews
    });
  });
};

export const apiDateSpotIndexAccess = (addressAndDateSpotTestDatas: AddressAndDateSpotJoinData[]) => {
  cy.intercept('GET', 'api/v1/date_spots', (req) => {
    req.reply({ address_and_date_spots: addressAndDateSpotTestDatas });
  })
}