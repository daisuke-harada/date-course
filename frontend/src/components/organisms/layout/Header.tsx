import { memo, VFC } from "react";
import { Link } from "react-router-dom";

import { BaseButton } from "../../atoms/button/BaseButton";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { HamburgerButton } from "../../atoms/button/HamburgerButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { NavBar } from "../../molecules/layouts/NavBar";


export const Header: VFC = memo(() => {
  return(
    <>
      <header className="lg:h-32 sm:h-24 bg-white w-full shadow-xl z-40 fixed">
        <div className="lg:border-b-2 lg:flex-wrap w-full flex  justify-around font-bold">
          {/* 管理者ユーザーでないユーザーがログインしている場合 */}
            {/* <div className="mt-6"> デートコース作成ページに遷移 </div> */}
            {/* <div className="m-3">デートコース一覧ページに遷移 </div> */}
            {/* <div className="mt-6">ログアウト</div> */}
          {/* 管理者ユーザーでログイン */}
            {/* <div className="mt-6">デートスポット作成</div> */}
          {/* ログインしてないユーザー */}
            <div className="lg:flex hidden mt-5 justify-center">
              <div className="mr-4"><BaseButton>新規登録</BaseButton></div>
              <div className="ml-4"><SecondaryButton>ログイン</SecondaryButton></div>
            </div>
            <div className="lg:mr-20 lg:my-3 lg:mx-0 sm:text-6xl sm:m-3 text-4xl m-5 mx-4">
              <Link to="/" className="text-black">DateCourses</Link>
            </div>
            <div className="lg:hidden ">
              <HamburgerButton />
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
      <NavBar isOpen={false}/>
    </>
  );
});