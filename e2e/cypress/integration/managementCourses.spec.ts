import { testUser } from '../fixtures/users/response';
import { userSigninSuccess } from "../support/hooks/session";
import { apiDateSpotIndexAccess } from '../support/backendAccessMock/dateSpots/apiDateSpotAccess';
import { addressAndDateSpotTestDatas } from '../fixtures/dateSpots/addressAndDateSpotTestDatas';

describe('managementCourses', () => {
  it('デートコースを登録する', () => {
    userSigninSuccess(testUser);
    apiDateSpotIndexAccess(addressAndDateSpotTestDatas);
    cy.visit('/dateSpots/index');
    cy.screenshot();
  });
});