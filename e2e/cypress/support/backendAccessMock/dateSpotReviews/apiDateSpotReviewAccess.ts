import { AddressAndDateSpotJoinData } from '../../types/dateSpots/response';
import { DateSpotReviewAndUserResponseData } from './../../types/dateSpotReviews/response';

export const apiDateSpotReviewCreateAccess = (review: DateSpotReviewAndUserResponseData, dateSpotReviews: DateSpotReviewAndUserResponseData[], addressAndDateSpot: AddressAndDateSpotJoinData) => {
  const copyReviews = dateSpotReviews.slice();
  copyReviews.push(review);

  cy.intercept('POST', 'api/v1/date_spot_reviews', (req) => {
    req.reply({status: 'created', dateSpotReviews: copyReviews, reviewAverageRate: addressAndDateSpot.averageRate});
  });
};

export const apiDateSpotReviewDestroyAccess = (dateSpotReview: DateSpotReviewAndUserResponseData, dateSpotReviews: DateSpotReviewAndUserResponseData[], averageRate: number) => {
  cy.intercept('DELETE', `api/v1/date_spot_reviews/${dateSpotReview.id}`, (req) => {
    req.reply({status: 'deleted', dateSpotReviews: dateSpotReviews, rateAverageRate: averageRate});
  });
};

export const apiDateSpotReviewUpdateAccess = (review: DateSpotReviewAndUserResponseData, dateSpotReviews: DateSpotReviewAndUserResponseData[], addressAndDateSpot: AddressAndDateSpotJoinData) => {
  const copyReviews = dateSpotReviews.slice();
  copyReviews.push(review);

  cy.intercept('PUT', `api/v1/date_spot_reviews/${review.id}`, (req) => {
    req.reply({status: 'updated', dateSpotReviews: copyReviews, reviewAverageRate: addressAndDateSpot.averageRate});
  });
};