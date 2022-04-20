import { apiUserShowAccess, apiSignUpAccess } from '../support/backendAccessMock/courses/users/apiUserAccess';
import { testUserInput } from '../fixtures/users/session';
import { dataE2eGet } from './../support/hooks/dataE2eGet';
import { testUser } from '../fixtures/users/response';

describe('Users', () => {
  it('新規登録画面で新規登録を行う', () => {
    cy.visit('/users/new');
    dataE2eGet('user-form-name-input').type(testUserInput.name);
    dataE2eGet('user-form-email-input').type(testUserInput.email);
    dataE2eGet('user-form-password-input').type(testUserInput.password);
    dataE2eGet('user-form-passwordConfirmation-input').type(testUserInput.password);
    apiSignUpAccess(true, true, testUser);
    apiUserShowAccess(testUser);
    dataE2eGet('user-form-button').click();
    cy.contains('新規登録に成功しました');
    cy.contains(testUser.name);
    cy.contains(testUser.gender);
    cy.screenshot();
  });

  it('ログイン画面から新規登録画面に遷移し、新規登録する', () => {
    
    
  });

  it('ユーザー情報の編集に成功する', () => {
  });

  it('ログインしてない場合ユーザーの編集ページにアクセスできません', () => {
  });

  it('ログインしているユーザーが違うユーザーの編集ページにアクセスできない', () => {
  });

  it('ユーザーが退会する', () => {
  });

  it('ログインしてフォローする', () => {
  });

  it('ユーザーを探すページが表示される', () => {
  });
});
