import { UserResponseData } from '../../support/types/users/response';

export const guestUser: UserResponseData = {
  id: 1,
  admin: false,
  email: 'guest@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  image: {url: null},
  name: 'guest',
  passwordDigest: '$2a$12$oRyyDNUmG.pCMjaOQCgnJuxhVmwDUHp/eMg.SZ2Hw/SIBr.l6'
}

export const testUser: UserResponseData = {
  id: 2,
  name: 'daisuke',
  admin: false,
  email: 'daisuke@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  image: {url: null},
  passwordDigest: 'daisukedaisukedaisuke'
}

export const anotherTestUser: UserResponseData = {
  admin: false,
  email: 'marika@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '女性',
  id: 3,
  image: {url: null},
  name: 'marika',
  passwordDigest: 'marikamarika'
}

export const adminUser: UserResponseData = {
  admin: true,
  email: 'adminstrator@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  id: 4,
  image: {url: null},
  name: 'admin',
  passwordDigest: '$2a$12$SvhAEtXg88sD6UAhkUzQ3u5gQxNWPzaZ.q9CIX5ecvuxMgUMZYeaW'

}