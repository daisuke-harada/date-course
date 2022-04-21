import { spotReviewAndDateSpotResponseDatas } from "../../../fixtures/dateSpotReviews/spotReviewTestDatas";
import { UserResponseData } from "../../types/users/response";

export const apiUserShowAccess = (userParam: UserResponseData) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam, courses:[], dateSpotReviews: spotReviewAndDateSpotResponseDatas });
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