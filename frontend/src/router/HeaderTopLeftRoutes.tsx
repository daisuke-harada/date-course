import { BaseButton } from "components/atoms/button/BaseButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";

export const headerTopLeftRoutes = [
  {
    element: <BaseButton>新規登録</BaseButton>,
    path: "users/new"
  },
  {
    element: <SecondaryButton>ログイン</SecondaryButton>,
    path: "login"
  },
]