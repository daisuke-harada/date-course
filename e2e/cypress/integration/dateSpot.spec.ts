import { AddressAndDateSpotJoinInputData } from './../support/types/AddressAndDateSpotJoinDataType';
import { addressAndDateSpotDatas } from './../fixtures/dateSpots/addressAndDateSpotDatas';
import { addressAndDateSpotEditDatas } from './../fixtures/dateSpots/addressAndDateSpotEditDatas'
import { apiDateSpotsAccess } from './../support/backendAccessMock/date_spots/apiDateSpotsAccess';
import { apiDateSpotDestroyAccess } from './../support/backendAccessMock/date_spots/apiDateSpotDestroyAccess';
import { apiDateSpotUpdateAccess } from './../support/backendAccessMock/date_spots/apiDateSpotUpdateAccess';
import { adminData } from "../fixtures/users/adminData";
import { apiDateSpotCreateAccess } from "../support/backendAccessMock/date_spots/apiDateSpotCreateAccess";
import { apiDateSpotShow } from "../support/backendAccessMock/date_spots/apiDateSpotShow";
import { dataE2eGet } from "../support/hooks/dataE2eGet";
import { userSigninSuccessInput } from "../support/hooks/session";

const dateSpotFormCreateSuccess = (addressAndDateSpotData: AddressAndDateSpotJoinInputData) => {
  cy.contains('デートスポットの新規登録');
  dataE2eGet("dateSpot-form-name-input").type(addressAndDateSpotData.dateSpot.name);
  dataE2eGet("dateSpot-prefecture-select").select(addressAndDateSpotData.prefectureId);
  dataE2eGet("dateSpot-form-cityName-input").type(addressAndDateSpotData.cityName);
  dataE2eGet("dateSpot-genre-select").select(addressAndDateSpotData.dateSpot.genreId);
  dataE2eGet("dateSpot-opningTime-select").select(addressAndDateSpotData.dateSpot.openingTime);
  dataE2eGet("dateSpot-closingTime-select").select(addressAndDateSpotData.dateSpot.closingTime);
  apiDateSpotCreateAccess(addressAndDateSpotData.dateSpot);
  apiDateSpotShow(addressAndDateSpotData);
  dataE2eGet("dateSpot-regist-button").click();
  cy.contains('新規登録に成功しました');
  cy.contains(addressAndDateSpotData.dateSpot.name);
};

const dateSpotFormUpdateSuccess = (addressAndDateSpotData: AddressAndDateSpotJoinInputData) => {
  cy.contains('デートスポット情報の編集');
  dataE2eGet("dateSpot-form-name-input").clear();
  dataE2eGet("dateSpot-form-name-input").type(addressAndDateSpotData.dateSpot.name);
  dataE2eGet("dateSpot-prefecture-select").select(addressAndDateSpotData.prefectureId);
  dataE2eGet("dateSpot-form-cityName-input").clear();
  dataE2eGet("dateSpot-form-cityName-input").type(addressAndDateSpotData.cityName);
  dataE2eGet("dateSpot-genre-select").select(addressAndDateSpotData.dateSpot.genreId);
  dataE2eGet("dateSpot-opningTime-select").select(addressAndDateSpotData.dateSpot.openingTime);
  dataE2eGet("dateSpot-closingTime-select").select(addressAndDateSpotData.dateSpot.closingTime);
  apiDateSpotUpdateAccess(addressAndDateSpotData.dateSpot);
  apiDateSpotShow(addressAndDateSpotData);
  dataE2eGet('dateSpot-update-button').click();
  cy.contains('情報を更新しました');
  cy.contains(addressAndDateSpotData.dateSpot.name);
};

describe('DateSpots', () => {
  it('新規登録画面で新規登録に成功する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    dateSpotFormCreateSuccess(addressAndDateSpotDatas[0]);
  });

  it('デートスポット編集ページに遷移し、デートスポット情報を更新する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    dateSpotFormCreateSuccess(addressAndDateSpotDatas[0]);
    cy.contains('デートスポット情報編集').click();
    dateSpotFormUpdateSuccess(addressAndDateSpotEditDatas[0]);
  });

  it('デートスポット編集ページに遷移し、デートスポット情報を削除する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    dateSpotFormCreateSuccess(addressAndDateSpotDatas[0]);
    cy.contains('デートスポット情報編集').click();
    apiDateSpotDestroyAccess(addressAndDateSpotDatas[0].dateSpot);
    cy.contains('削除').click();
    cy.contains('削除しました');
  });

  it('デートスポットを探すページを表示する', () => {
    apiDateSpotsAccess(addressAndDateSpotDatas);
    cy.visit('/dateSpots/index');
    addressAndDateSpotDatas.forEach((address: AddressAndDateSpotJoinInputData) => {
      cy.contains(address.dateSpot.name);
      cy.contains(address.genreName);
      cy.contains(address.cityName);
    });
    cy.screenshot();
  });

});
