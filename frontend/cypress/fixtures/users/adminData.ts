import { UserResponseData } from "../../../src/types/users/response";

export const adminData: UserResponseData = {
  id: 5,
  name: "admin",
  email: "adminstrator@gmail.com",
  gender: "男性",
  image: {
    url: null
  },
  admin: true,
  passwordDigest: "adminadminadmin",
  createdAt: new Date('2017/11/27 20:30'),
  updatedAt: new Date('2017/11/27 20:30')
};


