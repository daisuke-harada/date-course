import { addressDatas } from "../fixtures/addresses/addressDatas";
import { dateSpotDatas } from "../fixtures/dateSpots/dateSpotDatas";
import { adminData } from "../fixtures/users/adminData";
import { apiDateSpotCreateAccess } from "../support/backendAccessMock/date_spots/apiDateSpotCreateAccess";
import { apiDateSpotShow } from "../support/backendAccessMock/date_spots/apiDateSpotShow";
import { dataE2eGet } from "../support/hooks/dataE2eGet";
import { userSigninSuccessInput } from "../support/hooks/session";

describe('DateSpots', () => {
  it('新規登録画面で新規登録に成功する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    cy.contains('デートスポットの新規登録');
    dataE2eGet("dateSpot-form-name-input").type(dateSpotDatas[0].name);
    dataE2eGet("dateSpot-prefecture-select").select(40);
    dataE2eGet("dateSpot-form-cityName-input").type('福岡市');
    dataE2eGet("dateSpot-genre-select").select(1);
    dataE2eGet("dateSpot-opningTime-select").select(dateSpotDatas[0].openingTime);
    dataE2eGet("dateSpot-closingTime-select").select(dateSpotDatas[0].closingTime);
    apiDateSpotCreateAccess(dateSpotDatas[0]);
    apiDateSpotShow(dateSpotDatas[0], addressDatas[0]);
    dataE2eGet("dateSpot-regist-button").click();
    cy.contains("デートスポットの詳細");
  });
});