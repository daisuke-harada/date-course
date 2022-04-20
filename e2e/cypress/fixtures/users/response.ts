import { UserResponseData } from '../../support/types/users/response';

export const guestUser: UserResponseData = {
  admin: false,
  email: 'guest@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  id: 1,
  image: {url: null},
  name: 'guest',
  passwordDigest: '$2a$12$oRyyDNUmG.pCMjaOQCgnJuxhVmwDUHp/eMg.SZ2Hw/SIBr.l6'
}

export const testUser: UserResponseData = {
  admin: false,
  email: 'daisuke@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  id: 2,
  image: {url: null},
  name: 'daisuke',
  passwordDigest: '$2a$12$dgt/I/o3GZ6Fj5BsoiGNwufVccdfsgeFoA1hRks0K6YdG.qZW0'
}

export const anotherTestUser: UserResponseData = {
  admin: false,
  email: 'kenta@gmail.com',
  followerIds: [],
  followingIds: [],
  gender: '男性',
  id: 3,
  image: {url: null},
  name: 'peter',
  passwordDigest: '$2a$12$VWVmYK2Lbw.Rp3qWMEUKPu5qTxdXyBB1547MRYRpXFo5Jlbhaor'
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