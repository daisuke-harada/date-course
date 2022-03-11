import { dateSpotDatas } from "../../../fixtures/dateSpots/dateSpotDatas";
import { DateSpotTestDataType } from "../../types/DateSpotTestDataType";

export const apiDateSpotsAccess = (userDatas: DateSpotTestDataType[]) => {
  cy.intercept('GET', 'api/v1/date_spots', (req) => {
    req.reply({dateSpots: dateSpotDatas});
  });
};