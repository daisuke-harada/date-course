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
    createdAt: new Date('2017/11/27 20:30'),
    updatedAt: new Date('2017/11/27 20:30')
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
    createdAt: new Date('2017/11/27 20:30'),
    updatedAt: new Date('2017/11/27 20:30')
  },
  {
    id: 3,
    name: "marika",
    email: "marika@gmail.com",
    gender: "女",
    image: {
      url: null
    },
    passwordDigest: "marikamarikamarika",
    createdAt: new Date('2017/11/27 20:30'),
    updatedAt: new Date('2017/11/27 20:30')
  },
];


