import { addressAndDateSpotTestDatas } from "../fixtures/dateSpots/addressAndDateSpotTestDatas";
import { apiHomeTopAccess } from "../support/backendAccessMock/homes/apiHomeAccess";
import { apiPrefectureShowAccess } from "../support/backendAccessMock/prefectures/apiPrefectureAccess";

describe('prefectures', () => {
  it('ホームページから、県名を選択しその県名のデートスポット一覧ページへ遷移する', () => {
    const prefectureDateSpots = addressAndDateSpotTestDatas.filter(
      (addressAndDateSpot) => addressAndDateSpot.prefectureName === '福岡県'
    );
    apiHomeTopAccess();
    cy.visit('/');
    apiPrefectureShowAccess('福岡県', addressAndDateSpotTestDatas);
    cy.contains('福岡県').first().click();
    cy.contains('検索結果: 福岡県の人気ランキング');
    prefectureDateSpots.map((addressAndDateSpot) => {
      // rankingで表示されている分
      cy.contains(addressAndDateSpot.dateSpot.name).first();
      cy.contains(addressAndDateSpot.cityName).first();
      cy.contains(addressAndDateSpot.genreName).first();

      // 一覧ページで表示されている分
      cy.contains(addressAndDateSpot.dateSpot.name).last();
      cy.contains(addressAndDateSpot.cityName).last();
      cy.contains(addressAndDateSpot.genreName).last();
    });
    cy.screenshot();
  })
});