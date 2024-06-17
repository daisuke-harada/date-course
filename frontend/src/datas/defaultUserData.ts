import { UserResponseData } from "types/users/response";

export const defaultUserResponseData: UserResponseData = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  image: {
    url: null
  },
  followingIds: [0],
  followerIds: [0],
}