import { UserResponseData } from "../../types/users/response";
import { spotReviewAndUserTestDatas } from "../../../fixtures/dateSpotReviews/spotReviewTestDatas"

export const apiUserShowAccess = (userParam: UserResponseData) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam, courses:[], dateSpotReviews: spotReviewAndUserTestDatas });
  });
};

export const apiSignUpAccess = (condition: boolean, loginStatusData: boolean, userData: UserResponseData ) => {
  if(condition){
    cy.intercept('POST', 'api/v1/signup', (req) => {
      req.reply({status: "created", loginStatus: loginStatusData, user: userData});
    });
  }
};

export const apiLoginAccess = (loginStatusData: boolean, userParam: UserResponseData) => {
  cy.intercept('POST', 'api/v1/login',  (req) => {
    req.reply({loginStatus: loginStatusData, user: userParam});
  });
};