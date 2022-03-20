import { UserResponseData } from "../../../src/types/users/response";
import { dataE2eGet } from "./dataE2eGet";
import { apiLoginAccess } from "../backendAccessMock/sessions/apiLoginAccess";
import { apiUserShowAccess } from "../backendAccessMock/users/apiUserShowAccess";

export const userSigninSuccessInput = (user: UserResponseData) => {
  cy.contains('ログイン画面');
  cy.contains('新規登録はこちら');
  dataE2eGet("name-input").type(user.name);
  dataE2eGet("password-input").type(user.name);
  apiLoginAccess(true, user);
  apiUserShowAccess(user);
  dataE2eGet("login-button").click();
  cy.contains('ログインに成功しました');
  cy.contains(user.name);
  cy.contains(user.gender);
};