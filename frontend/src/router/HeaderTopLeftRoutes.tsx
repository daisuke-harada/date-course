import { BaseButton } from "../components/atoms/button/BaseButton";
import { SecondaryButton } from "../components/atoms/button/SecondaryButton";

export const headerTopLeftRoutes = [
  {
    element: <BaseButton buttonSize={"w-full"}>新規登録</BaseButton>,
    path: "users/new"
  },
  {
    element: <SecondaryButton buttonSize={"w-full"}>ログイン</SecondaryButton>,
    path: "login"
  },
]