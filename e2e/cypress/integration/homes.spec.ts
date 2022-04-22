import { apiHomeTopAccess } from "../support/backendAccessMock/homes/apiHomeAccess";
import { Genre, Prefecture } from "../support/types/datas/activeHash";

const mainPrefectures: {attributes: Prefecture}[] = [
  { attributes: { id: 13, name: '東京都', areaId: 2 } }, { attributes: {id: 14, name: '神奈川県', areaId: 2 }},
  { attributes: { id: 23, name: '愛知県', areaId: 3 } }, { attributes: { id: 26, name: '京都府', areaId: 4 }},
  { attributes: { id: 27, name: '大阪府', areaId: 4 } }, { attributes: { id: 40, name: '福岡県', areaId: 6 }}
];

const mainGenres: {attributes: Genre}[] = [
  { attributes: { id: 1, name: 'ショッピングモール' } }, { attributes: { id: 2, name: '飲食店' }}, { attributes: { id: 3, name: 'カフェ' } },
  { attributes: { id: 4, name: 'アウトドア' } }, { attributes: { id: 5, name: '遊園地' }}, {attributes: { id: 6, name: '水族館' } },
];

describe('homes', () => {
  it('Topページを表示する', () => {
    apiHomeTopAccess();
    cy.visit('/');
    cy.contains('DateCourses');
    cy.contains('全国の人気ランキング');
    mainPrefectures.map((data) => cy.contains(data.attributes.name));
    mainGenres.map((data) => (cy.contains(data.attributes.name)));
  });
});