import { CourseDuringSpotCard } from "components/organisms/managementCourses/CourseDuringSpotCard";
import { memo, useState, VFC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";
import { Directions } from "components/molecules/maps/Directions";
import { LoadScript } from "@react-google-maps/api";
import { Map } from "components/molecules/maps/Map";

const MainDiv = tw.div`bg-white mt-10 m-20 py-5 px-10 shadow-xl rounded-2xl`;

export const CreateCourse: VFC = memo(() => {
  const getCurrentUser = useRecoilValue(currentUserState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  // デートコースの距離、時間を管理するステートを設定
  const [legs, setLegs] = useState<Array<{duration: string, distance: string}>>([]);

  return(
      <MainDiv>
        <h1 className="m-5 font-bold text-3xl pb-5">デートコース作成</h1>
        <div className="w-full mt-5 flex">
          {
            managementCourses.courseDuringSpots.length === 0?
            <p className="text-blue-600 text-center m-10 text-3xl">
              目的地は登録されていません。デートスポットをデートコースに追加してみましょう。
            </p>
            :
            <>
              <div className="w-1/3">
                {
                  managementCourses.courseDuringSpots.map((courseDuringSpot ,index) => (
                    <CourseDuringSpotCard
                      key={courseDuringSpot.dateSpot.id}
                      courseDuringSpot={courseDuringSpot}
                      managementCourses={managementCourses}
                      setManagementCourses={setManagementCourses}
                      courseNumber={index}
                      leg={legs[index]}
                    />
                  ))
                }
              </div>
              <div className="w-2/3 mx-3 rounded-xl">
                {
                  managementCourses.courseDuringSpots.length === 1?
                  <Map  addressAndDateSpot={managementCourses.courseDuringSpots[0]} />
                  :
                  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} >
                     <Directions managementCourses={managementCourses} setLegs={setLegs} />
                  </LoadScript>
                }
              </div>
            </>
          }
        </div>
        <div className="text-center">
          {/* ボタンエリア */}
        </div>
      </MainDiv>
  );
});