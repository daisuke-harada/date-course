import { UserResponseData } from "../../../types/users/response";

export const apiUserShowAccess = (userParam: UserResponseData) => {
  cy.intercept('GET', `api/v1/users/${userParam.id}`, (req) => {
    req.reply({user: userParam, courses:[], dateSpots: []});
  });
};

export const apiSignUpAccess = (condition: boolean, loginStatusData: boolean, userData: UserResponseData ) => {
  if(condition){
    cy.intercept('POST', 'api/v1/signup', (req) => {
      req.reply({status: "created", loginStatus: loginStatusData, user: userData});
    });
  }
};