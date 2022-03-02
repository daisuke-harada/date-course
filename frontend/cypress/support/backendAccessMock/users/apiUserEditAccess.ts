export const apiUserEditAccess = (userParam) => {
  cy.intercept('PUT', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({status: "update", user: userParam});
  });
};