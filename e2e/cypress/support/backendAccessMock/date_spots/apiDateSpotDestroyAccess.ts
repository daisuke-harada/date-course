export const apiDateSpotDestroyAccess = (dateSpotParam) => {
  cy.intercept('DELETE', `api/v1/date_spots/${dateSpotParam.id}`, (req) => {
    req.reply({status: "delete"});
  });
};