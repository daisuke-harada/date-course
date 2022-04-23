import { apiDateSpotReviewCreateAccess, apiDateSpotReviewUpdateAccess, apiDateSpotReviewDestroyAccess } from './../support/backendAccessMock/dateSpotReviews/apiDateSpotReviewAccess';
import { DateSpotReviewAndUserResponseData } from './../support/types/dateSpotReviews/response';
import { dataE2eGet } from './../support/hooks/dataE2eGet';
import { spotReviewAndUserTestDatas } from '../fixtures/dateSpotReviews/spotReviewTestDatas';
import { addressAndDateSpotTestDatas } from '../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { anotherTestUser } from '../fixtures/users/response';
import { userSigninSuccess } from '../support/hooks/session';
import { apiDateSpotShowAccess, apiDateSpotShowReviewsChangeAccess } from './../support/backendAccessMock/dateSpots/apiDateSpotAccess';

const dateSpotReviewFormInput = (review: DateSpotReviewAndUserResponseData) => {
  dataE2eGet('dateSpotReview-comment-input').clear();
  dataE2eGet('dateSpotReview-comment-input').type(review.content);
}

// reviewの中から、userIdが等しいreviewを検索する。
const currentUserDateSpotReview = (userId: number, reviews: DateSpotReviewAndUserResponseData[]) => {
  return reviews.find((review) => review.userId === userId);
};

// reviewの中から、dateSpotIdが等しいものを検索して、新たな配列を作成する。
const dateSpotIdSearchReviews = (dateSpotId: number) => {
  return spotReviewAndUserTestDatas.filter((review) => review.dateSpotId === dateSpotId);
};

// reviewの中から、userIdを含まない新たな配列を作成する。
const reviewsExceptUser = (userId: number, reviews: DateSpotReviewAndUserResponseData[]) => {
  return reviews.filter((review) => review.userId !== userId);
};

describe('dateSpotReviews', () => {
  it('デートスポットレビューを投稿する', () => {
    userSigninSuccess(anotherTestUser);
    const spotReviews = dateSpotIdSearchReviews(addressAndDateSpotTestDatas[0].dateSpot.id);
    const reviews = reviewsExceptUser(anotherTestUser.id, spotReviews);
    const anotherTestUserReview = currentUserDateSpotReview(anotherTestUser.id, spotReviews);

    apiDateSpotShowReviewsChangeAccess(addressAndDateSpotTestDatas[0], reviews);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].dateSpot.id}`);
    dateSpotReviewFormInput(anotherTestUserReview);
    apiDateSpotReviewCreateAccess(anotherTestUserReview, reviews, addressAndDateSpotTestDatas[0]);
    dataE2eGet('dateSpotReview-create-button').click();
    cy.contains('コメントを投稿しました');
    cy.contains(anotherTestUserReview.userName);
    cy.contains(anotherTestUserReview.content);
  });

  it('デートスポットレビューを編集する', () => {
    const spotReviews = dateSpotIdSearchReviews(addressAndDateSpotTestDatas[0].dateSpot.id);
    const reviewsExcept = reviewsExceptUser(anotherTestUser.id, spotReviews);
    const anotherTestUserEditReview = {
      id: currentUserDateSpotReview(anotherTestUser.id, spotReviews).id,
      rate: 4,
      content: 'editediteditedit',
      userName: currentUserDateSpotReview(anotherTestUser.id, spotReviews).userName,
      userGender: currentUserDateSpotReview(anotherTestUser.id, spotReviews).userGender,
      userId: currentUserDateSpotReview(anotherTestUser.id, spotReviews).userId,
      userImage: {
        url: null
      },
      dateSpotId: currentUserDateSpotReview(anotherTestUser.id, spotReviews).dateSpotId
    };
    userSigninSuccess(anotherTestUser);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].dateSpot.id}`);
    dataE2eGet('dateSpotReview-edit-button').click();
    dateSpotReviewFormInput(anotherTestUserEditReview);
    apiDateSpotReviewUpdateAccess(anotherTestUserEditReview, reviewsExcept, addressAndDateSpotTestDatas[0]);
    dataE2eGet('dateSpotReview-update-button').click();
    cy.contains('コメントを更新しました');
    cy.contains(anotherTestUserEditReview.userName);
    cy.contains(anotherTestUserEditReview.content);
  });

  it('デートスポットレビューを編集ステータスにし、編集ステータスを解除する', () => {
    userSigninSuccess(anotherTestUser);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].dateSpot.id}`);
    dataE2eGet('dateSpotReview-edit-button').click();
    dataE2eGet('dateSpotReview-edit-cancel-button').click();
  });

  it('デートスポットレビューを削除する', () => {
    userSigninSuccess(anotherTestUser);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].dateSpot.id}`);
    const review = currentUserDateSpotReview(anotherTestUser.id, dateSpotIdSearchReviews(addressAndDateSpotTestDatas[0].dateSpot.id));
    apiDateSpotReviewDestroyAccess(
      review,
      reviewsExceptUser(anotherTestUser.id, dateSpotIdSearchReviews(addressAndDateSpotTestDatas[0].dateSpot.id)),
      addressAndDateSpotTestDatas[0].averageRate
    );
    dataE2eGet('dateSpotReview-edit-button').click();
    dataE2eGet('dateSpotReview-delete-button').click();
    cy.screenshot();
  });
});