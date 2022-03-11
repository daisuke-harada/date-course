import { AddressTestDataType } from '../../types/AddressTestDataType';
import { DateSpotTestDataType } from '../../types/DateSpotTestDataType';


export const apiDateSpotShow = (dateSpotData: DateSpotTestDataType, addressData: AddressTestDataType) => {
  cy.intercept('GET', `api/v1/date_spots/${dateSpotData.id}`,  (req) => {
    req.reply({dateSpot: dateSpotData, address: addressData});
  });
};