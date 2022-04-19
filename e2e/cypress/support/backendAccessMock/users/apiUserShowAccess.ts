import { UserResponseData } from "../../types/users/response";

export const apiUserShowAccess = (userParam: UserResponseData) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam, courses: [], date_spot_reviews: [] });
  });
};