import { userData } from "../fixtures/users/userData";
import { apiLoginAccess } from "../support/backendAccessMock/sessions/apiLoginAccess";
import { apiUserShowAccess } from "../support/backendAccessMock/users/apiUserShowAccess";

describe('Users', () => {
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
  });
});
