import { spotReviewAndUserTestDatas } from './../fixtures/dateSpotReviews/spotReviewTestDatas';
import { userSigninSuccess } from '../support/hooks/session';
import { adminUser, testUser } from '../fixtures/users/response';
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { addressAndDateSpotTestDatas } from '../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { prefectureDatas } from '../fixtures/datas/prefectureDatas';
import { apiDateSpotCreateAccess, apiDateSpotShowAccess, apiDateSpotIndexAccess, apiDateSpotUpdateAccess, apiDateSpotDeleteAccess } from '../support/backendAccessMock/dateSpots/apiDateSpotAccess';
import { AddressAndDateSpotJoinData } from '../support/types/dateSpots/response';

const dateSpotFormInput = (dateSpotName: string, prefectureName: string, cityName: string, genreId: number, openingTime: string, closingTime: string) => {
  dataE2eGet('dateSpot-form-name-input').clear();
  dataE2eGet('dateSpot-form-name-input').type(dateSpotName);
  const prefectureId = prefectureDatas.find((data) => data.name === prefectureName).id
  dataE2eGet('dateSpot-prefecture-select').select(prefectureId.toString());
  dataE2eGet('dateSpot-form-cityName-input').clear();
  dataE2eGet('dateSpot-form-cityName-input').type(cityName);
  dataE2eGet('dateSpot-genre-select').select(genreId);
  dataE2eGet('dateSpot-opningTime-select').select(openingTime);
  dataE2eGet('dateSpot-closingTime-select').select(closingTime);
}

const dateSpotConfirm = (addressAndDateSpot: AddressAndDateSpotJoinData) => {
  cy.contains(addressAndDateSpot.dateSpot.name);
  cy.contains(addressAndDateSpot.averageRate);
  cy.contains(addressAndDateSpot.cityName);
  cy.contains(addressAndDateSpot.genreName);
}

const currentDateSpotReviews = (addressAndDateSpot: AddressAndDateSpotJoinData) => {
  return spotReviewAndUserTestDatas.filter((review) => review.dateSpotId === addressAndDateSpot.dateSpot.id);
}

describe('dateSpots', () => {
  it('デートスポット詳細ページを表示する', () => {
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].id}`);
    dateSpotConfirm(addressAndDateSpotTestDatas[0]);
  });

  it('デートスポット詳細ページのレビューが表示されている', () => {
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].id}`);
    currentDateSpotReviews(addressAndDateSpotTestDatas[0]).map((review) => {
      cy.contains(review.userName);
      cy.contains(review.rate);
    });
  });

  it('新規登録画面でDateSpotの新規登録を行う', () => {
    userSigninSuccess(adminUser);
    cy.visit('/dateSpots/new');
    dateSpotFormInput(
      addressAndDateSpotTestDatas[0].dateSpot.name,
      addressAndDateSpotTestDatas[0].prefectureName,
      addressAndDateSpotTestDatas[0].cityName,
      addressAndDateSpotTestDatas[0].dateSpot.genreId,
      addressAndDateSpotTestDatas[0].dateSpot.openingTime.toISOString(),
      addressAndDateSpotTestDatas[0].dateSpot.closingTime.toISOString()
    );
    apiDateSpotCreateAccess(addressAndDateSpotTestDatas[0].dateSpot);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    dataE2eGet('dateSpot-form-button').click();
    dateSpotConfirm(addressAndDateSpotTestDatas[0]);
  });

  it('デートスポット情報を編集する', () => {
    userSigninSuccess(adminUser);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].id}`);
    dataE2eGet('dateSpot-edit-button').click();
    const editAddressAndDateSpotData: AddressAndDateSpotJoinData = {
      id: addressAndDateSpotTestDatas[0].id,
      cityName: addressAndDateSpotTestDatas[1].cityName,
      prefectureName: addressAndDateSpotTestDatas[1].prefectureName,
      dateSpot: {
        id: addressAndDateSpotTestDatas[0].dateSpot.id,
        name: addressAndDateSpotTestDatas[1].dateSpot.name,
        genreId: addressAndDateSpotTestDatas[1].dateSpot.genreId,
        image: {
          url: null
        },
        openingTime: addressAndDateSpotTestDatas[1].dateSpot.openingTime,
        closingTime: addressAndDateSpotTestDatas[1].dateSpot.closingTime,
        createdAt: addressAndDateSpotTestDatas[1].dateSpot.createdAt,
        updatedAt: addressAndDateSpotTestDatas[1].dateSpot.updatedAt,
      },
      genreName: addressAndDateSpotTestDatas[1].genreName,
      latitude: addressAndDateSpotTestDatas[1].latitude,
      longitude: addressAndDateSpotTestDatas[1].longitude,
      reviewTotalNumber: addressAndDateSpotTestDatas[1].reviewTotalNumber,
      averageRate: addressAndDateSpotTestDatas[1].averageRate
    };

    dateSpotFormInput(
      editAddressAndDateSpotData.dateSpot.name,
      editAddressAndDateSpotData.prefectureName,
      editAddressAndDateSpotData.cityName,
      editAddressAndDateSpotData.dateSpot.genreId,
      editAddressAndDateSpotData.dateSpot.openingTime.toISOString(),
      editAddressAndDateSpotData.dateSpot.closingTime.toISOString()
    );

    apiDateSpotUpdateAccess(editAddressAndDateSpotData.dateSpot);
    apiDateSpotShowAccess(editAddressAndDateSpotData);
    dataE2eGet('dateSpot-form-button').click();
    cy.contains('情報を更新しました');
    dateSpotConfirm(editAddressAndDateSpotData);
  });

  it('デートスポットを削除する', () => {
    userSigninSuccess(adminUser);
    apiDateSpotShowAccess(addressAndDateSpotTestDatas[0]);
    cy.visit(`/dateSpots/${addressAndDateSpotTestDatas[0].id}`);
    dataE2eGet('dateSpot-edit-button').click();
    apiDateSpotDeleteAccess(addressAndDateSpotTestDatas[0]);
    cy.contains('削除').click();
    cy.contains('削除しました');
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
  });

});