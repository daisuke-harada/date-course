import { BaseButton } from "../components/atoms/button/BaseButton";
import { SecondaryButton } from "../components/atoms/button/SecondaryButton";

export const headerTopLeftRoutes = [
  {
    element: <BaseButton addClassNames={"w-full"}>新規登録</BaseButton>,
    path: "users/new"
  },
  {
    element: <SecondaryButton addClassNames={"w-full"}>ログイン</SecondaryButton>,
    path: "login"
  },
]