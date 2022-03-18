import { UserResponseData } from "../../../src/types/users/response";

export const userDatas: UserResponseData[] =[
  {
    id: 1,
    name: "daisuke",
    email: "daisuke@gmail.com",
    gender: "男性",
    image: {
      url: null
    },
    passwordDigest: "daisukedaisuke",
    followingIds: [],
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
    followerIds: []
  },
  {
    id: 3,
    name: "marika",
    email: "marika@gmail.com",
    gender: "女性",
    image: {
      url: null
    },
    passwordDigest: "marikamarikamarika",
    followingIds: [],
    followerIds: []
  },
];


