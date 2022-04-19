import { UserResponseData } from "../../types/UserResponseTestDataType";

export const apiUsersAccess = (userDatas: UserResponseData[]) => {
  cy.intercept('GET', 'api/v1/users', (req) => {
    req.reply({users: userDatas});
  });
};