import { addressAndDateSpotDatas } from './../fixtures/dateSpots/addressAndDateSpotDatas';
import { apiDateSpotsAccess } from './../support/backendAccessMock/date_spots/apiDateSpotsAccess';
import { userDatas } from '../fixtures/users/userDatas';
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { userSigninSuccessInput } from './../support/hooks/session';
import { AddressAndDateSpotInputData } from '../support/types/dateSpots/input';

describe('managementCourse', () => {
  beforeEach(() => {
    cy.visit('/login');
    userSigninSuccessInput(userDatas[0]);
  });

  it('デートコース作成画面が表示される', () => {
    cy.visit('managementCourses/createCourse');
    cy.contains('デートコース作成');
  });

  it('デートコース一覧画面からデートコースにデートスポットを追加する', () => {
    apiDateSpotsAccess(addressAndDateSpotDatas);
    cy.visit('dateSpots/index');
    addressAndDateSpotDatas.forEach((address: AddressAndDateSpotInputData) => {
      cy.contains(address.dateSpot.name);
      cy.contains(address.genreName);
      cy.contains(address.cityName);
    });
    dataE2eGet(`courseAddButtonId-${addressAndDateSpotDatas[0].id}`).click();
    cy.contains('デートコース作成');
  });
});