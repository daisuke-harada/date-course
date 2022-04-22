import { UserResponseData } from "../../types/users/response";

export const apiRelationShipCreateAccess = (currentUser: UserResponseData, followedUser: UserResponseData, users: UserResponseData[]) => {
  const currentTestUser = {
    id: currentUser.id,
    name: currentUser.name,
    admin: false,
    email: currentUser.email,
    followerIds: [],
    followingIds: [followedUser.id],
    gender: currentUser.gender,
    image: {url: null},
    passwordDigest: 'daisukedaisukedaisuke'
  }
  const followedTestUser = {
    id: followedUser.id,
    name: followedUser.name,
    admin: false,
    email: followedUser.email,
    followerIds: [currentUser.id],
    followingIds: [],
    gender: followedUser.gender,
    image: {url: null},
    passwordDigest: 'marikamarika'
  }

  const afterUsers = users.filter((user) => (user.id !== currentUser.id && user.id !== followedUser.id));
  afterUsers.push(currentTestUser);
  afterUsers.push(followedTestUser);

  cy.intercept('POST', 'api/v1/relationships', (req) => {
    req.reply({
      status: 'created',
      users: afterUsers,
      current_user: currentTestUser,
      followed_user: followedTestUser
    });
  });
};

export const apiRelationShipDeleteAccess = (currentUser: UserResponseData, followedUser: UserResponseData, users: UserResponseData[]) => {
  const currentTestUser = {
    id: currentUser.id,
    name: currentUser.name,
    admin: false,
    email: currentUser.email,
    followerIds: [],
    followingIds: [],
    gender: currentUser.gender,
    image: {url: null},
    passwordDigest: 'daisukedaisukedaisuke'
  }
  const unfollowedTestUser = {
    id: followedUser.id,
    name: followedUser.name,
    admin: false,
    email: followedUser.email,
    followerIds: [],
    followingIds: [],
    gender: followedUser.gender,
    image: {url: null},
    passwordDigest: 'marikamarika'
  }

  cy.intercept('DELETE', `api/v1/relationships/${currentTestUser.id}/${unfollowedTestUser.id}`, (req) => {
    req.reply({
      status: 'deleted',
      users: users,
      currentUser: currentTestUser,
      unfollowedUser:  unfollowedTestUser
    })
  });
};

export const apiFollowers = (targetUser: UserResponseData, followers: UserResponseData[]) => {
  cy.intercept('GET', `api/v1/users/${targetUser.id}/followers`, (req) => {
    req.reply({
      userName: targetUser.name,
      users: followers,
    });
  });
};

export const apiFollowings = (targetUser: UserResponseData, followings: UserResponseData[]) => {
  cy.intercept('GET', `/api/v1/users/${targetUser.id}/followings`, (req) => {
    req.reply({
      user_name: targetUser.name,
      users: followings
    });
  })
}