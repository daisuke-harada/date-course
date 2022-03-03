export const apiUserDestroyAccess = (userParam) => {
  cy.intercept('DELETE', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({status: "delete"});
  });
};