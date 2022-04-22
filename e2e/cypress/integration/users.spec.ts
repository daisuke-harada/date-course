import { guestUser, anotherTestUser, testUser } from '../fixtures/users/response';
import { apiLoginAccess, apiUserIndexAccess, apiUserUpdateAccess, apiUserShowAccess, apiSignUpAccess, apiUserDeleteAccess } from '../support/backendAccessMock/users/apiUserAccess';
import { testUserInput } from '../fixtures/users/session';
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { userSigninSuccess } from '../support/hooks/session';
import { spotReviewAndDateSpotResponseDatas } from '../fixtures/dateSpotReviews/spotReviewTestDatas';
import { apiHomeTopAccess } from '../support/backendAccessMock/homes/apiHomeAccess';

const users = [guestUser, testUser, anotherTestUser];

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
  });

  it('ログイン画面から新規登録に遷移して、新規登録する', () => {
    cy.visit('/login');
    cy.contains('新規登録はこちら').click();
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
  });

  it('ログイン画面からログインする', () => {
    userSigninSuccess(testUser);
  });

  it('ゲストログインボタンを押して、ログインする', () =>{
    apiHomeTopAccess();
    cy.visit('/');
    dataE2eGet('slide-down-btn').click();
    apiLoginAccess(true, guestUser);
    apiUserShowAccess(guestUser);
    dataE2eGet('guest-login-button').last().click();
    cy.contains('ログインに成功しました');
  });

  it('ログインして、そのユーザーのレビュー一覧を表示する', () => {
    userSigninSuccess(testUser);
    cy.contains('レビュー').click();
    spotReviewAndDateSpotResponseDatas.map((review) => (cy.contains(review.dateSpot.name)));
  });

  it('ユーザー情報の編集に成功する', () => {
    const editUser = {
      admin: false,
      email: 'editEmail@gmail.com',
      followerIds: [],
      followingIds: [],
      gender: '男性',
      id: testUser.id,
      image: {url: null},
      name: 'editName',
      passwordDigest: 'editPasswordeditPassword'
    };
    userSigninSuccess(testUser);
    cy.contains('設定').click();
    dataE2eGet('user-form-name-input').clear();
    dataE2eGet('user-form-name-input').type(editUser.name);
    dataE2eGet('user-form-email-input').clear();
    dataE2eGet('user-form-email-input').type(editUser.email);
    dataE2eGet('user-form-password-input').clear();
    dataE2eGet('user-form-password-input').type('editPassword');
    dataE2eGet('user-form-passwordConfirmation-input').clear();
    dataE2eGet('user-form-passwordConfirmation-input').type('editPassword');
    apiUserUpdateAccess(editUser);
    apiUserShowAccess(editUser);
    dataE2eGet('user-form-button').click();
    cy.contains('情報を更新しました');
    cy.contains(editUser.name);
    cy.contains(editUser.gender);
  });

  it('ログインしてない場合ユーザーの編集ページにアクセスできません', () => {
    apiHomeTopAccess();
    cy.visit('/');
    cy.visit('/users/1/edit');
    cy.contains('アカウント所有者しかアクセスできません');
  });

  it('ログインしているユーザーが違うユーザーの編集ページにアクセスできない', () => {
    userSigninSuccess(testUser);
    cy.visit(`/users/${guestUser.id}/edit`);
    cy.contains('アカウント所有者しかアクセスできません');
  });

  it('ユーザーが退会する', () => {
    userSigninSuccess(testUser);
    cy.contains('設定').click();
    apiUserDeleteAccess(testUser.id);
    cy.contains('退会').click();
    cy.contains('退会しました');
  });

  it('ユーザーを探すページが表示される', () => {
    apiUserIndexAccess(users);
    cy.visit('/users/index');
    users.map((user) => {
      cy.contains(user.name);
    });
  });

  it('ログインしてフォローする', () => {
  });

  it('ログインしてフォローを解除する');

  it('ログインしてユーザー一覧ページからフォローする');
  it('ログインしてユーザー一覧ページからフォローを解除する');
});
