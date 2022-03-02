export const apiUserShowAccess = (userData) => {
  cy.intercept('GET', 'api/v1/users/1', (req) => {
    req.reply({user: userData});
  });
};