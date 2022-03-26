import { CourseDuringSpotCard } from "components/organisms/managementCourses/CourseDuringSpotCard";
import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";

const MainDiv = tw.div`bg-white mt-10 m-20 py-5 px-10 shadow-xl rounded-2xl`;

export const CreateCourse: VFC = memo(() => {
  const getCurrentUser = useRecoilValue(currentUserState);
  const getMangementCourse = useRecoilValue(managementCourseState({userId: getCurrentUser.user.id}));
  return(
    <MainDiv>
      <h1 className="m-5 font-bold text-3xl pb-5">デートコース作成</h1>
      <div className="w-full mt-5 flex">
        {
          getMangementCourse.courseDuringSpotIdAndNames.length === 0?
          <p className="text-blue-600 text-center m-10 text-3xl">
            目的地は登録されていません。デートスポットをデートコースに追加してみましょう。
          </p>
          :
          <div className="w-1/3">
            {
              getMangementCourse.courseDuringSpotIdAndNames.map((courseDuringSpotIdAndName ,index) => (
                <CourseDuringSpotCard key={courseDuringSpotIdAndName.dateSpotId} addressAndDateSpotId={courseDuringSpotIdAndName.dateSpotId} courseDuringSpotIdAndNames={getMangementCourse.courseDuringSpotIdAndNames} courseNumber={index} />
              ))
            }
          </div>
        }
      </div>
      <div className="text-center">
        {/* ボタンエリア */}
      </div>
    </MainDiv>
  );
});