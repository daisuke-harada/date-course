import { Area, Genre, Prefecture } from '../../../support/types/datas/activeHash';
import { areaDatas } from "../../../fixtures/datas/areaDatas";
import { addressAndDateSpotTestDatas } from '../../../fixtures/dateSpots/addressAndDateSpotTestDatas';
import { genreDatas } from '../../../fixtures/datas/genreDatas';

const mainPrefectures: {attributes: Prefecture}[] = [
  { attributes: { id: 13, name: '東京都', areaId: 2 } }, { attributes: {id: 14, name: '神奈川県', areaId: 2 }},
  { attributes: { id: 23, name: '愛知県', areaId: 3 } }, { attributes: { id: 26, name: '京都府', areaId: 4 }},
  { attributes: { id: 27, name: '大阪府', areaId: 4 } }, { attributes: { id: 40, name: '福岡県', areaId: 6 }}
];

const mainGenres: {attributes: Genre}[] = [
  { attributes: { id: 1, name: 'ショッピングモール' } }, { attributes: { id: 2, name: '飲食店' }}, { attributes: { id: 3, name: 'カフェ' } },
  { attributes: { id: 4, name: 'アウトドア' } }, { attributes: { id: 5, name: '遊園地' }}, {attributes: { id: 6, name: '水族館' } },
];

const attributeGenres: {attributes: Genre}[] = genreDatas.map((data) => ({attributes: data}));
const attributeAreas: {attributes: Area}[] = areaDatas.map((data) => ({attributes: data}));


export const apiHomeTopAccess = () => {
  cy.intercept('GET', 'api/v1/top', (req) => {
    req.reply({areas: attributeAreas, mainPrefectures: mainPrefectures, mainGenres: mainGenres, genres: attributeGenres, addressAndDateSpots: addressAndDateSpotTestDatas});
  });
}