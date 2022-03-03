export const apiUserEditAccess = () => {
  cy.intercept('GET', 'api/v1/users', (req) => {
    req.reply({status: "update", users: userParam});
  });
};