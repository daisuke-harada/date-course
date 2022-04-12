import { LoadScript } from "@react-google-maps/api";
import { DangerButton } from "components/atoms/button/DangerButton";
import { Directions } from "components/molecules/maps/Directions";
import { CourseDuringSpotCard } from "components/organisms/card/managementCourses/CourseDuringSpotCard";
import { client } from "lib/api/client";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";
import { ManagementCourseData } from "types/managementCourses/management";

const MainDiv = tw.div`bg-white mt-10 m-20 py-5 px-10 shadow-xl rounded-2xl`;
const TitleH1 = tw.h1`text-center mt-5 font-bold text-4xl pb-5`;
const CourseAreaDiv = tw.div`w-full flex`;
const ButtonArea = tw.div`flex flex-col items-center mx-5 my-10`;
const ButtonParentDiv = tw.div`text-center m-5 text-4xl w-1/2`

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [managementCourses, setManagementCourses] = useState<ManagementCourseData>({
    userId: 0,
    courseDuringSpots: []
  });

  const [courseInfo, setCourseInfo] = useState<{travelMode: string, authority: string}>({
    travelMode: 'DRIVING',
    authority: '公開'
  });

  // デートコースの距離、時間を管理するステートを設定
  const [legs, setLegs] = useState<Array<{duration: string, distance: string}>>([]);
  const navigate = useNavigate();
  const [travelModeText, setTravelModeText] = useState('');
  const getCurrentUser = useRecoilValue(currentUserState);

  const onClickDeleteCourse = useCallback(()=>{
    client.delete(`courses/${id}`).then(response => {
      response.data.status === 'deleted' && navigate(`/users/${getCurrentUser.user.id}`, {state: {message: 'デートコースを削除しました', type: 'success-message', condition: true}});
    });
  },[id, getCurrentUser.user.id, navigate]);

  useEffect(() => {
    client.get(`courses/${id}`).then(response => {
      setManagementCourses({userId: response.data.course.user.id, courseDuringSpots: response.data.course.courseDuringSpots});
      setCourseInfo({travelMode: response.data.course.travelMode, authority: response.data.course.authority});
      if(response.data.course.travelMode === 'DRIVING'){
        setTravelModeText('車');
      }else if(response.data.course.travelMode === 'CYCLING'){
        setTravelModeText('自転車');
      }else{
        setTravelModeText('歩き');
      }
    });
  }, [id]);

  const prefectureNames = Array.from(new Set(managementCourses.courseDuringSpots.map((duringSpot) => (duringSpot.prefectureName))));

  return(
    <MainDiv>
      <TitleH1>デートコース詳細ページ</TitleH1>
      <div className="w-full mt-5 text-xl font-bold">
        {travelModeText}で移動<br/>
        他のユーザーに{courseInfo.authority}
        <div className='my-2 flex'>
          {
            prefectureNames.map((prefectureName) => (
              <div key={prefectureName} className='border-2 bg-red-300 border-red-300 text-white rounded-xl p-1 mr-2'>{prefectureName}</div>
            ))
          }
        </div>
      </div>
      <CourseAreaDiv>
        <div className="w-1/3">
          {
            managementCourses.courseDuringSpots.map((courseDuringSpot, index) => (
              <CourseDuringSpotCard
                key={courseDuringSpot.id}
                courseDuringSpot={courseDuringSpot}
                managementCourses={managementCourses}
                courseNumber={index}
                leg={legs[index]}
              />
            ))
          }
        </div>
        <div className="w-2/3 mx-3 rounded-xl">
          {
            // userIdが初期値である0の場合に読み込まないようにする
            managementCourses.userId !== 0
            &&
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} >
              <Directions managementCourses={managementCourses} setLegs={setLegs} travelMode={courseInfo.travelMode} />
            </LoadScript>
          }
        </div>
      </CourseAreaDiv>
      <ButtonArea>
        {
          getCurrentUser.user.id === managementCourses.userId
          &&
          (
            <ButtonParentDiv>
              <DangerButton onClickEvent={onClickDeleteCourse}>
                デートコースを削除
              </DangerButton>
            </ButtonParentDiv>
          )
        }
      </ButtonArea>
    </MainDiv>
  );
});