import { UserResponseData } from "../../../../src/types/users/response";

export const apiUsersAccess = (userDatas: UserResponseData[]) => {
  cy.intercept('GET', 'api/v1/users', (req) => {
    req.reply({users: userDatas});
    cy.debug();
  });
};