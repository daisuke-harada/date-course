import { UserResponseData } from "../../../../src/types/users/response";

export const apiUserEditAccess = (userParam: UserResponseData) => {
  cy.intercept('PUT', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({status: "update", user: userParam});
  });
};