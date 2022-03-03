import { userDatas } from "../fixtures/users/userDatas";
import { apiSignUpAccess } from "../support/backendAccessMock/registrations/apiSignUpAccess";
import { apiLoginAccess } from "../support/backendAccessMock/sessions/apiLoginAccess";
import { apiUserEditAccess } from "../support/backendAccessMock/users/apiUserEditAccess";
import { apiUserShowAccess } from "../support/backendAccessMock/users/apiUserShowAccess";
import { dataE2eGet } from "../support/hooks/dataE2eGet";
import { User } from "../../src/types/api/session";

const userFormSignUpSuccess = (user: User) => {
  dataE2eGet("user-form-name-input").clear();
  dataE2eGet("user-form-name-input").type(user.name);
  dataE2eGet("user-form-email-input").clear();
  dataE2eGet("user-form-email-input").type(user.email);
  dataE2eGet("user-form-password-input").type(user.name);
  dataE2eGet("user-form-passwordConfirmation-input").type(user.name);
  cy.get('[type="radio"]').check(user.gender);
  apiSignUpAccess(true, true, user);
  apiUserShowAccess(user);
  dataE2eGet("user-form-button").click();
  cy.contains("新規登録に成功しました");
  cy.contains(user.name);
  cy.contains(user.gender);
};

const userFormEditSuccess = (user: User) => {
  dataE2eGet("user-form-name-input").clear();
  dataE2eGet("user-form-name-input").type(user.name);
  dataE2eGet("user-form-email-input").clear();
  dataE2eGet("user-form-email-input").type(user.email);
  dataE2eGet("user-form-password-input").type(user.name);
  dataE2eGet("user-form-passwordConfirmation-input").type(user.name);
  cy.get('[type="radio"]').check(user.gender);
  apiUserEditAccess(user);
  apiUserShowAccess(user);
  dataE2eGet("user-form-button").click();
  cy.contains(user.name);
  cy.contains(user.gender);
};

const userSigninSuccessInput = (user: User) => {
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
}

describe('Users', () => {
  it('新規登録画面で新規登録を行う', () => {
    cy.visit('/users/new');
    userFormSignUpSuccess(userDatas[2]);
  });

  it('ログイン画面から新規登録画面に遷移し、新規登録する', () => {
    cy.visit('/');
    dataE2eGet("slide-down-btn").click();
    dataE2eGet("header-signup-link").last().click();
    userFormSignUpSuccess(userDatas[0]);
  });

  it('ユーザー情報の編集に成功する', () => {
    cy.visit('/login');
    userSigninSuccessInput(userDatas[0]);
    cy.contains("アカウント情報編集").click();
    cy.contains("アカウント情報編集");
    userFormEditSuccess(userDatas[1]);
  });

  it('ログインしてない場合ユーザーの編集ページにアクセスできません', () => {
    cy.visit('/');
    apiUserShowAccess(userDatas[0]);
    cy.visit('/users/1/edit');
    cy.contains('アカウント所有者しかアクセスできません');
  });

  it('ログインしているユーザーが違うユーザーの編集ページにアクセスできない', () => {
    cy.visit('/login');
    userSigninSuccessInput(userDatas[0]);
    apiUserShowAccess(userDatas[2]);
    cy.visit('/users/2/edit');
    cy.contains('アカウント所有者しかアクセスできません');
  });
});
