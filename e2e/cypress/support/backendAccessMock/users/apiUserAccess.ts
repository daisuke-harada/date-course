import { courseTestDatas } from "../../../fixtures/courses/courseTestDatas";
import { spotReviewAndDateSpotResponseDatas } from "../../../fixtures/dateSpotReviews/spotReviewTestDatas";
import { UserResponseData } from "../../types/users/response";

export const apiUserShowAccess = (userParam: UserResponseData) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam, courses: courseTestDatas.filter((courseTestData) => courseTestData.user.id === userParam.id), dateSpotReviews: spotReviewAndDateSpotResponseDatas });
  });
};

export const apiSignUpAccess = (condition: boolean, loginStatusData: boolean, userData: UserResponseData ) => {
  if(condition){
    cy.intercept('POST', 'api/v1/signup', (req) => {
      req.reply({status: "created", loginStatus: loginStatusData, user: userData});
    });
  }
};

export const apiUserUpdateAccess = (userParam: UserResponseData) => {
  cy.intercept('PUT', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({status: 'updated', user: userParam });
  });
};

export const apiUserDestroyAccess = (userId: number) => {
  cy.intercept('DELETE', `api/v1/users/${userId}`, (req) => {
    req.reply({status: 'deleted'});
  })
}

export const apiUserIndexAccess = (users: UserResponseData[]) => {
  cy.intercept('GET', 'api/v1/users', (req) => {
    req.reply({users: users})
  })
}

export const apiLoginAccess = (loginStatusData: boolean, userParam: UserResponseData) => {
  cy.intercept('POST', 'api/v1/login',  (req) => {
    req.reply({loginStatus: loginStatusData, user: userParam});
  });
};