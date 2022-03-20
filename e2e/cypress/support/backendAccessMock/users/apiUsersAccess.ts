import { UserResponseData } from "../../types/UserResponse";

export const apiUsersAccess = (userDatas: UserResponseData[]) => {
  cy.intercept('GET', 'api/v1/users', (req) => {
    req.reply({users: userDatas});
  });
};