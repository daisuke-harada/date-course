import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";

export const CreateCourse: VFC = memo(() => {
  const getCurrentUser = useRecoilValue(currentUserState);
  const getMangementCourse = useRecoilValue(managementCourseState({userId: getCurrentUser.user.id}));
  console.log(getMangementCourse);
  return(
    <>
      <h1 className="m-5 font-bold text-3xl pb-5">デートコース作成</h1>
      <div className="mt-10 bg-white p-5 w-full">
        <div className="w-full mt-5 flex">
          {
            <p className="text-blue-600 text-center m-10 text-3xl">
              目的地は登録されていません。デートスポットをデートコースに追加してみましょう。
            </p>
            // <div className="w-6/12">
            // </div>
          }
        </div>
        <div className="text-center">
          {/* ボタンエリア */}
        </div>
      </div>
    </>
  );
});