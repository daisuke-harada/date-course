import { apiDateSpotIndexAccess } from './../support/backendAccessMock/dateSpots/apiDateSpotAccess';
import { userSigninSuccess } from '../support/hooks/session';
import { adminUser, testUser } from "../fixtures/users/response";
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { addressAndDateSpotTestDatas } from '../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { prefectureDatas } from '../fixtures/datas/prefectureDatas';
import { apiDateSpotCreateAccess, apiDateSpotShowAccess } from '../support/backendAccessMock/dateSpots/apiDateSpotAccess';

describe('dateSpots', () => {
  it('新規登録画面でDateSpotの新規登録を行う', () => {
    userSigninSuccess(adminUser);
    cy.visit('/dateSpots/new');
    dataE2eGet('dateSpot-form-name-input').type(addressAndDateSpotTestDatas[0].dateSpot.name);
    const prefectureId = prefectureDatas.find((data) => data.name === addressAndDateSpotTestDatas[0].prefectureName).id
    dataE2eGet('dateSpot-prefecture-select').select(prefectureId.toString());
    dataE2eGet('dateSpot-form-cityName-input').type(addressAndDateSpotTestDatas[0].cityName);
    dataE2eGet('dateSpot-genre-select').select(addressAndDateSpotTestDatas[0].dateSpot.genreId);
    dataE2eGet('dateSpot-opningTime-select').select(addressAndDateSpotTestDatas[0].dateSpot.openingTime.toISOString());
    dataE2eGet('dateSpot-closingTime-select').select(addressAndDateSpotTestDatas[0].dateSpot.closingTime.toISOString());
    apiDateSpotCreateAccess(addressAndDateSpotTestDatas[0].dateSpot);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    dataE2eGet('dateSpot-regist-button').click();
    cy.contains(addressAndDateSpotTestDatas[0].dateSpot.name);
    cy.contains(addressAndDateSpotTestDatas[0].averageRate);
    cy.contains(addressAndDateSpotTestDatas[0].cityName);
    cy.contains(addressAndDateSpotTestDatas[0].genreName);
  });

  it('ログインしていない場合はDateSpotの新規登録ページに遷移できない', () => {
    cy.visit('/dateSpots/new');
    cy.contains('管理者しかアクセスできません')
  });

  it('管理者じゃない場合はDateSpotの新規登録ページに遷移できない', () => {
    userSigninSuccess(testUser);
    cy.visit('/dateSpots/new');
    cy.contains('管理者しかアクセスできません')
  });

  it('デートスポットの一覧ページを表示する', () => {
    apiDateSpotIndexAccess(addressAndDateSpotTestDatas);
    cy.visit('/dateSpots/index');
    cy.contains('全国の人気ランキング');
    addressAndDateSpotTestDatas.map((data) => {
      cy.contains(data.dateSpot.name);
      cy.contains(data.cityName);
      cy.contains(data.genreName);
    });
  })

})