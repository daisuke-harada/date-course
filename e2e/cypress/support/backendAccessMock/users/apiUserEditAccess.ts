import { UserResponseData } from "../../types/UserResponseTestDataType";

export const apiUserEditAccess = (userParam: UserResponseData) => {
  cy.intercept('PUT', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({status: "updated", user: userParam});
  });
};