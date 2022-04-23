import { prefectureDatas } from "../../../fixtures/datas/prefectureDatas";
import { AddressAndDateSpotJoinData } from "../../types/dateSpots/response";

export const apiPrefectureShowAccess = (prefectureName: string, addressAndDateSpots: AddressAndDateSpotJoinData[]) => {
  const prefectureDateSpots = addressAndDateSpots.filter(
    (addressAndDateSpot) => (addressAndDateSpot.prefectureName === prefectureName)
  );

  const prefectureId = prefectureDatas.find((data) => data.name === prefectureName).id;

  cy.intercept('GET', `api/v1/prefectures/${prefectureId}`, (req) => {
    req.reply({addressAndDateSpots: prefectureDateSpots});
  });
}