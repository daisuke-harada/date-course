import { spotReviewAndUserTestDatas } from '../fixtures/dateSpotReviews/spotReviewTestDatas';
import { addressAndDateSpotTestDatas } from '../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { anotherTestUser } from '../fixtures/users/response';
import { userSigninSuccess } from '../support/hooks/session';
import { apiDateSpotShowReviewsChangeAccess } from './../support/backendAccessMock/dateSpots/apiDateSpotAccess';

describe('dateSpotReviews', () => {
  it('デートスポットレビューを投稿する', () => {
    userSigninSuccess(anotherTestUser);
    const spotReviews = spotReviewAndUserTestDatas.filter((review) => review.dateSpotId === addressAndDateSpotTestDatas[0].dateSpot.id);
    const reviews = spotReviews.filter((review) => review.userId !== anotherTestUser.id);
    apiDateSpotShowReviewsChangeAccess(addressAndDateSpotTestDatas[0], reviews);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].dateSpot.id}`);
    cy.contains(anotherTestUser.name);
    cy.screenshot();
  });

});