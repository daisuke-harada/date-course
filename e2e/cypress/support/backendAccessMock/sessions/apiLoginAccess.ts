export const apiLoginAccess = (loginStatusData, userParam) => {
  cy.intercept('POST', 'api/v1/login',  (req) => {
    req.reply({loginStatus: loginStatusData, user: userParam});

  });
};