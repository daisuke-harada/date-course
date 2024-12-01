import { guestUser, anotherTestUser, testUser } from '../fixtures/users/response';
import { apiLoginAccess, apiUserIndexAccess, apiUserUpdateAccess, apiUserShowAccess, apiSignUpAccess, apiUserDestroyAccess } from '../support/backend_railsAccessMock/users/apiUserAccess';
import { testUserInput } from '../fixtures/users/session';
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { userSigninSuccess } from '../support/hooks/session';
import { spotReviewAndDateSpotResponseDatas } from '../fixtures/dateSpotReviews/spotReviewTestDatas';
import { apiHomeTopAccess } from '../support/backend_railsAccessMock/homes/apiHomeAccess';
import { apiRelationShipCreateAccess, apiRelationShipDestroyAccess, apiFollowers, apiFollowings } from '../support/backend_railsAccessMock/relationships/apiRelationShipAccess';
import { UserResponseData } from '../support/types/users/response';

const users = [guestUser, testUser, anotherTestUser];

const currentFollowActionUser = (currentUser: UserResponseData, targetUser: UserResponseData) => {
  return {
    id: testUser.id,
    name: testUser.name,
    admin: false,
    email: testUser.email,
    followerIds: [],
    followingIds: [targetUser.id],
    gender: testUser.gender,
    image: {url: null},
    passwordDigest: 'daisukedaisukedaisuke'
  }
}

const followedUser = (followedUser: UserResponseData, currentfollowActionUser: UserResponseData) => {
  return {
    id: followedUser.id,
    name: followedUser.name,
    admin: false,
    email: followedUser.email,
    followerIds: [currentfollowActionUser.id],
    followingIds: [],
    gender: followedUser.gender,
    image: {url: null},
    passwordDigest: 'marikamarika'
  }
}

const userFormInput = (name: string, email: string, password: string) => {
  dataE2eGet('user-form-name-input').clear();
  dataE2eGet('user-form-name-input').type(name);
  dataE2eGet('user-form-email-input').clear();
  dataE2eGet('user-form-email-input').type(email);
  dataE2eGet('user-form-password-input').clear();
  dataE2eGet('user-form-password-input').type(password);
  dataE2eGet('user-form-passwordConfirmation-input').clear();
  dataE2eGet('user-form-passwordConfirmation-input').type(password);
}

describe('Users', () => {
  it('新規登録画面で新規登録を行う', () => {
    cy.visit('/users/new');
    userFormInput(testUserInput.name, testUserInput.email, testUserInput.password);
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
    userFormInput(testUserInput.name, testUserInput.email, testUserInput.password);
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
    userFormInput(editUser.name, editUser.email, 'editPassword');
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
    apiUserDestroyAccess(testUser.id);
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
    userSigninSuccess(testUser);
    apiUserIndexAccess(users);
    cy.visit('/users/index');
    apiUserShowAccess(anotherTestUser);
    cy.contains(anotherTestUser.name).click();
    apiRelationShipCreateAccess(testUser, anotherTestUser, users);
    dataE2eGet(`follow-button-${anotherTestUser.id}`).click();
    cy.contains('フォロー中');
  });

  it('フォロワー一覧ページへ画面遷移する', () => {
    userSigninSuccess(testUser);
    apiUserIndexAccess(users);
    cy.visit('/users/index');
    apiUserShowAccess(anotherTestUser);
    cy.contains(anotherTestUser.name).click();
    apiRelationShipCreateAccess(testUser, anotherTestUser, users);
    dataE2eGet(`follow-button-${anotherTestUser.id}`).click();
    cy.contains('フォロー中');
    apiFollowers(followedUser(anotherTestUser, testUser), [currentFollowActionUser(testUser, anotherTestUser)]);
    cy.contains('フォロワー 1').click();
    cy.contains(`${followedUser(anotherTestUser, testUser).name}のフォロワー`);
    cy.contains(currentFollowActionUser(testUser, anotherTestUser).name);
    cy.contains(currentFollowActionUser(testUser, anotherTestUser).gender);
  });
  it('フォロー中一覧ページへ画面遷移する', () => {
    userSigninSuccess(currentFollowActionUser(testUser, anotherTestUser));
    apiFollowings(currentFollowActionUser(testUser, anotherTestUser), [followedUser(anotherTestUser, testUser)]);
    cy.contains('フォロー中 1').click();
    cy.contains(`${currentFollowActionUser(testUser, anotherTestUser).name}がフォローしているユーザー`);
    cy.contains(followedUser(anotherTestUser, testUser).name);
    cy.contains(followedUser(anotherTestUser, testUser).gender);
  });

  it('ログインしてフォローを解除する', () => {
    userSigninSuccess(currentFollowActionUser(testUser, anotherTestUser));
    apiUserShowAccess(followedUser(anotherTestUser, testUser));
    cy.visit(`/users/${followedUser(anotherTestUser, testUser).id}`);
    apiRelationShipDestroyAccess(currentFollowActionUser(testUser, anotherTestUser), followedUser(anotherTestUser, testUser), users);
    dataE2eGet(`unfollow-button-${anotherTestUser.id}`).click();
    cy.contains('フォロー');
  });

  it('ログインしてユーザー一覧ページからフォローする', () => {
    userSigninSuccess(testUser);
    apiUserIndexAccess(users);
    cy.visit('/users/index');
    apiRelationShipCreateAccess(testUser, anotherTestUser, users);
    dataE2eGet(`follow-button-${anotherTestUser.id}`).click();
    cy.contains('フォロワー 1');
    cy.contains('フォロー中 1');
  });

  it('ログインしてユーザー一覧ページからフォローを解除する', () => {
    userSigninSuccess(testUser);
    apiUserIndexAccess(users);
    cy.visit('/users/index');
    apiRelationShipCreateAccess(testUser, anotherTestUser, users);
    dataE2eGet(`follow-button-${anotherTestUser.id}`).click();
    cy.contains('フォロワー 1');
    cy.contains('フォロー中 1');
    apiRelationShipDestroyAccess(currentFollowActionUser(testUser, anotherTestUser), followedUser(anotherTestUser, testUser), users);
    dataE2eGet(`unfollow-button-${anotherTestUser.id}`).click();
  });
});
