export const apiSignUpAccess = (condition ,loginStatusData, userData) => {
  if(condition){
    cy.intercept('POST', 'api/v1/signup',  (req) => {
      req.reply({status: "created", loginStatus: loginStatusData, user: userData});
    });
  }else{

  };
}