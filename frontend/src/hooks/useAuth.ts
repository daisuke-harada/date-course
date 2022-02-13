// import Cookies from "js-cookie"

import { client } from "../lib/api/client"
import { SignUpParams } from "../types/session"

export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
}