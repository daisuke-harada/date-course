import { areaDatas } from "../../../fixtures/areaDatas";
import { prefectureDatas } from "../../../fixtures/prefectureDatas";

export const apiDateSpotNewAccess = () => {
  cy.intercept('GET', 'api/v1/date_spots/new', (req) => {
    req.reply({areas: areaDatas, prefectures: prefectureDatas});
  });
};