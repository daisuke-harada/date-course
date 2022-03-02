import { userData } from "../fixtures/users/userData";
import { apiSignUpAccess } from "../support/backendAccessMock/registrations/apiSignUpAccess";
import { apiLoginAccess } from "../support/backendAccessMock/sessions/apiLoginAccess";
import { apiUserShowAccess } from "../support/backendAccessMock/users/apiUserShowAccess";

describe('Users', () => {
  it('新規登録画面で新規登録を行う', () => {
    cy.visit('/users/new');
    cy.get('[data-e2e="user-form-name-input"]').type(userData.name);
    cy.get('[data-e2e="user-form-email-input"]').type(userData.email);
    cy.get('[data-e2e="user-form-password-input"]').type(userData.name);
    cy.get('[data-e2e="user-form-passwordConfirmation-input"]').type(userData.name);
    apiSignUpAccess(true, true, userData);
    cy.get('[data-e2e="user-form-button"]').click();
    apiUserShowAccess(userData);
    cy.contains(userData.name);
    cy.contains(userData.gender);
  });

  it('ログイン画面から新規登録画面に遷移し、新規登録する', () => {
    cy.visit('/');
    cy.get('[date-e2e="slide-down-btn"]').click();
    cy.get('[date-e2e="header-top-login-button"]').first().click();
    cy.get('[data-e2e="user-form-name-input"]').type(userData.name);
    cy.get('[data-e2e="user-form-email-input"]').type(userData.email);
    cy.get('[data-e2e="user-form-password-input"]').type(userData.name);
    cy.get('[data-e2e="user-form-passwordConfirmation-input"]').type(userData.name);
    apiSignUpAccess(true, true, userData);
    cy.get('[data-e2e="user-form-button"]').click();
    apiUserShowAccess(userData);
    cy.contains(userData.name);
    cy.contains(userData.gender);
  });


  it('ログイン画面でログインを行う', () => {
    cy.visit('/login');
    cy.contains('ログイン画面');
    cy.contains('新規登録はこちら');
    cy.get('[data-e2e="name-input"]').type(userData.name);
    cy.get('[data-e2e="password-input"]').type(userData.name);
    apiLoginAccess(true, userData);
    apiUserShowAccess(userData);
    cy.get('[data-e2e="login-button"').click();
    cy.contains('ログインに成功しました');
    cy.contains(userData.name);
    cy.contains(userData.gender);
  });
});
