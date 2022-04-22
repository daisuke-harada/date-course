import { AddressAndDateSpotJoinData } from '../../types/dateSpots/response';
import { DateSpotReviewAndUserResponseData } from './../../types/dateSpotReviews/response';

export const apiDateSpotReviewCreateAccess = (dateSpotReviews: DateSpotReviewAndUserResponseData[], addressAndDateSpot: AddressAndDateSpotJoinData) => {
  cy.intercept('POST', 'api/v1/date_spot_reviews', (req) => {
    req.reply({status: 'created', date_spot_reviews: dateSpotReviews, review_average_rate: addressAndDateSpot.averageRate});
  });
};

export const apiDateSpotReviewDestroyAccess = (dateSpotReview: DateSpotReviewAndUserResponseData) => {
  cy.intercept('DELETE', `api/v1/date_spot_reviews/${dateSpotReview.id}`, (req) => {
    
  });
};

export const apiDateSpotReviewUpdateAccess = (dateSpotReview: DateSpotReviewAndUserResponseData) => {
  cy.intercept('PUT', `api/v1/date_spot_reviews/${dateSpotReview.id}`, (req) => {

  });
};