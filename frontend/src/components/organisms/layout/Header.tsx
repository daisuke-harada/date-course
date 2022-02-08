import { memo, VFC } from "react";
import { BaseButton } from "../../atoms/button/BaseButton";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";

export const Header: VFC = memo(() => {
  return(
    <header className="h-32 bg-white w-full shadow-xl z-50 fixed">
      <div className="lg:flex lg:border-b-2 w-full flex-wrap justify-around font-bold">
        {/* 管理者ユーザーでないユーザーがログインしている場合 */}
          {/* <div className="mt-6"> デートコース作成ページに遷移 </div> */}
          {/* <div className="m-3">デートコース一覧ページに遷移 </div> */}
          {/* <div className="mt-6">ログアウト</div> */}
        {/* 管理者ユーザーでログイン */}
          {/* <div className="mt-6">デートスポット作成</div> */}
        {/* ログインしてないユーザー */}
          <div className="lg:flex hidden mt-5 justify-center">
            <div className="mr-4"><BaseButton>新規登録ボタン</BaseButton></div>
            <div className="ml-4"><SecondaryButton>ログイン</SecondaryButton></div>
          </div>
          <div className="lg:mr-28 lg:my-3 lg:mx-0 sm:text-6xl sm:mt-7 text-5xl text-black  mt-10 mx-3">
            DateCourses
            {/* DateCourses toppageに遷移する */}
          </div>
          <div className="lg:block hidden mt-5">
            <GuestLoginButton>ゲストログイン</GuestLoginButton>
          </div>
      </div>
      <ul className="lg:flex hidden flex-wrap text-base justify-center font-bold">
        <li className="my-3 mx-6">デートスポットを探す</li>
        <li className="my-3 mx-6">デートコースを探す</li>
        <li className="my-3 mx-6">ユーザーを探す</li>
        {/* 管理者ユーザーでないユーザーがログインしている場合 */}
          {/* <li className="my-3 mx-6">マイページ</li> */}
      </ul>
    </header>
  );
});