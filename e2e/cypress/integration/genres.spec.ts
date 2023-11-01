import { addressAndDateSpotTestDatas } from "../fixtures/dateSpots/addressAndDateSpotTestDatas";
import { apiGenreShowAccess } from "../support/backendAccessMock/genres/apiGenreAccess";
import { apiHomeTopAccess } from "../support/backendAccessMock/homes/apiHomeAccess";

describe('genres', () => {
  it('ホームページから、ジャンルを選択しそのジャンルのデートスポット一覧ページへ遷移する', () => {
    const genreDateSpots = addressAndDateSpotTestDatas.filter(
      (addressAndDateSpot) => addressAndDateSpot.dateSpot.genreId === 1
    );
    apiHomeTopAccess();
    cy.visit('/');
    apiGenreShowAccess(1, addressAndDateSpotTestDatas);
    cy.contains('ショッピングモール').first().click();
    cy.contains('検索結果: ショッピングモールの人気ランキング');
    genreDateSpots.map((addressAndDateSpot) => {
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