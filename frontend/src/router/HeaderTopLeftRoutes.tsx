import { BaseButton } from "components/atoms/button/BaseButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";

export const HeaderTopLeftRoutes = [
  {
    element: <BaseButton dataE2e="header-signup-link" >新規登録</BaseButton>,
    path: "users/new"
  },
  {
    element: <SecondaryButton dataE2e="header-login-link">ログイン</SecondaryButton>,
    path: "login"
  },
]