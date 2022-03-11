import { apiDateSpotUpdateAccess } from './../support/backendAccessMock/date_spots/apiDateSpotUpdateAccess';
import { addressDatas } from "../fixtures/addresses/addressDatas";
import { dateSpotDatas } from "../fixtures/dateSpots/dateSpotDatas";
import { adminData } from "../fixtures/users/adminData";
import { apiDateSpotCreateAccess } from "../support/backendAccessMock/date_spots/apiDateSpotCreateAccess";
import { apiDateSpotShow } from "../support/backendAccessMock/date_spots/apiDateSpotShow";
import { dataE2eGet } from "../support/hooks/dataE2eGet";
import { userSigninSuccessInput } from "../support/hooks/session";
import { dateSpotEditDatas } from '../fixtures/dateSpots/dateSpotEditDatas';
import { addressEditDatas } from '../fixtures/addresses/addressEditDatas';
import { DateSpotTestDataType } from '../support/types/DateSpotTestDataType';
import { AddressTestDataType } from '../support/types/AddressTestDataType';

const dateSpotFormCreateSuccess = (dateSpotData: DateSpotTestDataType, addressData: AddressTestDataType) => {
  cy.contains('デートスポットの新規登録');
  dataE2eGet("dateSpot-form-name-input").type(dateSpotData.name);
  dataE2eGet("dateSpot-prefecture-select").select(addressData.prefectureId);
  dataE2eGet("dateSpot-form-cityName-input").type(addressData.cityName);
  dataE2eGet("dateSpot-genre-select").select(dateSpotData.genreId);
  dataE2eGet("dateSpot-opningTime-select").select(dateSpotData.openingTime);
  dataE2eGet("dateSpot-closingTime-select").select(dateSpotData.closingTime);
  apiDateSpotCreateAccess(dateSpotData);
  apiDateSpotShow(dateSpotData, addressData);
  dataE2eGet("dateSpot-regist-button").click();
  cy.contains('新規登録に成功しました');
  cy.contains(dateSpotData.name);
};

const dateSpotFormUpdateSuccess = (dateSpotData: DateSpotTestDataType, addressData: AddressTestDataType) => {
  cy.contains('デートスポット情報の編集');
  dataE2eGet("dateSpot-form-name-input").clear();
  dataE2eGet("dateSpot-form-name-input").type(dateSpotData.name);
  dataE2eGet("dateSpot-prefecture-select").select(addressData.prefectureId);
  dataE2eGet("dateSpot-form-cityName-input").clear();
  dataE2eGet("dateSpot-form-cityName-input").type(addressData.cityName);
  dataE2eGet("dateSpot-genre-select").select(dateSpotData.genreId);
  dataE2eGet("dateSpot-opningTime-select").select(dateSpotData.openingTime);
  dataE2eGet("dateSpot-closingTime-select").select(dateSpotData.closingTime);
  apiDateSpotUpdateAccess(dateSpotData);
  apiDateSpotShow(dateSpotData, addressData);
  dataE2eGet('dateSpot-update-button').click();
  cy.contains('情報を更新しました');
  cy.contains(dateSpotData.name);
};

describe('DateSpots', () => {
  it('新規登録画面で新規登録に成功する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    dateSpotFormCreateSuccess(dateSpotDatas[0], addressDatas[0]);
  });

  it('デートスポット編集ページに遷移し、デートスポット情報を更新する', () => {
    cy.visit('/login');
    userSigninSuccessInput(adminData);
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-dateSpot-new-link").last().click();
    dateSpotFormCreateSuccess(dateSpotDatas[0], addressDatas[0]);
    cy.contains('デートスポット情報編集').click();
    dateSpotFormUpdateSuccess(dateSpotEditDatas[0], addressEditDatas[0]);
  });

});