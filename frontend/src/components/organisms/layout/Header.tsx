import { memo, VFC } from "react";

export const Header: VFC = memo(() => {
  return(
    <header className="bg-white h-32 w-full shadow-xl z-50 fixed">
      <div className="w-full flex justify-around border-b-2">
        {/* 管理者ユーザーでないユーザーがログインしている場合 */}
          {/* <div className="mt-6"> デートコース作成ページに遷移 </div> */}
          {/* <div className="m-3">デートコース一覧ページに遷移 </div> */}
          {/* <div className="mt-6">ログアウト</div> */}
        {/* 管理者ユーザーでログイン */}
          {/* <div className="mt-6">デートスポット作成</div> */}
        {/* ログインしてないユーザー */}
          <ul className="mt-5 flex justify-center">
            <li className="mx-5">新規登録ボタン</li>
            <li className="mx-5">ログインボタン</li>
          </ul>
          <div className="m-3">
            DateCourses
            {/* DateCourses toppageに遷移する */}
          </div>
          <div className="mt-5">
            ゲストログイン
          </div>
      </div>
      <ul className="flex flex-wrap text-base justify-center">
        <li className="my-3 mx-6">デートスポットを探す</li>
        <li className="my-3 mx-6">デートコースを探す</li>
        <li className="my-3 mx-6">ユーザーを探す</li>
        {/* 管理者ユーザーでないユーザーがログインしている場合 */}
          {/* <li className="my-3 mx-6">マイページ</li> */}
      </ul>
    </header>
  );
});