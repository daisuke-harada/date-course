import { AddressInput, DateSpotInput } from "../../../../src/types/dateSpots/inputType";

export const apiDateSpotShow = (dateSpotData: DateSpotInput, addressData: AddressInput) => {
  cy.intercept('GET', `api/v1/date_spots/${dateSpotData.id}`,  (req) => {
    req.reply({dateSpot: dateSpotData, address: addressData});
  });
};