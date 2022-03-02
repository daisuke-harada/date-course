import { BaseButton } from "components/atoms/button/BaseButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";

export const HeaderTopLeftRoutes = [
  {
    element: <BaseButton>新規登録</BaseButton>,
    path: "users/new"
  },
  {
    element: <SecondaryButton dataE2e='header-top-login-button'>ログイン</SecondaryButton>,
    path: "login"
  },
]