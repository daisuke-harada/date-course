import { UserResponseData } from "../../support/types/users/response";

export const defaultUserResponseData: UserResponseData = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  passwordDigest: '',
  image: {
    url: null
  },
  followingIds: [0],
  followerIds: [0],
}