export const apiUserShowAccess = (userParam) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam});
  });
};