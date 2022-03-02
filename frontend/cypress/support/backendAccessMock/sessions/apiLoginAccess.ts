export const apiLoginAccess = (loginStatusData, userData) => {
  cy.intercept('POST', 'api/v1/login',  (req) => {
    req.reply({loginStatus: loginStatusData, user: userData});
  });
}