import { UserResponseData } from "../../support/types/UserResponse";


export const followUserDatas: UserResponseData[] =[
  {
    id: 1,
    name: "daisuke",
    email: "daisuke@gmail.com",
    gender: "男性",
    image: {
      url: null
    },
    passwordDigest: "daisukedaisuke",
    followingIds: [2],
    followerIds: [],
  },
  {
    id: 2,
    name: "kenta",
    email: "kenta@gmail.com",
    gender: "男性",
    image: {
      url: null
    },
    passwordDigest: "kentakentakenta",
    followingIds: [],
    followerIds: [1]
  }
];

