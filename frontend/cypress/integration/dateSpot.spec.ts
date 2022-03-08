import { adminData } from "../fixtures/users/adminData";
import { apiDateSpotNewAccess } from "../support/backendAccessMock/date_spots/apiDateSpotNewAccess";
import { dataE2eGet } from "../support/hooks/dataE2eGet";
import { userSigninSuccessInput } from "../support/hooks/session";

describe('DateSpots', () => {
  it('新規登録画面で新規登録に成功する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    apiDateSpotNewAccess();
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    cy.contains('デートスポットの新規登録');
    dataE2eGet("dateSpot-form-name-input");
    dataE2eGet("dateSpot-form-cityName-input");
    cy.contains("登録");
  });
});