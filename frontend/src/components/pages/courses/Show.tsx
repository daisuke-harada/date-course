import { LoadScript } from '@react-google-maps/api';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { Directions } from 'components/molecules/maps/Directions';
import { CourseDuringSpotCard } from 'components/organisms/card/managementCourses/CourseDuringSpotCard';
import { client } from 'lib/api/client';
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'store/session';
import tw from 'tailwind-styled-components';
import { ManagementCourseData } from 'types/managementCourses/management';

const MainDiv = tw.div`md:mx-20 mx-2 px-2 bg-white mt-10 py-5 shadow-xl rounded-2xl`;
const TitleH1 = tw.h1`mobile(L):text-4xl text-center mt-5 font-bold pb-5`;
const CourseAreaDiv = tw.div`flex-col md:flex-row w-full flex`;
const ButtonArea = tw.div`flex flex-col items-center mx-5 my-10`;
const ButtonParentDiv = tw.div`lg:text-4xl sm:w-1/2 sm:text-2xl text-center m-5 w-3/4`

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [managementCourses, setManagementCourses] = useState<ManagementCourseData>({
    userId: 0,
    courseDuringSpots: []
  });

  const [courseInfo, setCourseInfo] = useState<{travelMode: string, authority: string, noDuplicatePrefectureNames: string[]}>({
    travelMode: 'DRIVING',
    authority: '公開',
    noDuplicatePrefectureNames: []
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
      setManagementCourses({userId: response.data.course.user.id, user: response.data.course.user, courseDuringSpots: response.data.course.courseDuringSpots});
      setCourseInfo({travelMode: response.data.course.travelMode, authority: response.data.course.authority, noDuplicatePrefectureNames: response.data.course.noDuplicatePrefectureNames});
      if(response.data.course.travelMode === 'DRIVING'){
        setTravelModeText('車');
      }else if(response.data.course.travelMode === 'CYCLING'){
        setTravelModeText('自転車');
      }else{
        setTravelModeText('歩き');
      }
    });
  }, [id]);

  return(
    <MainDiv>
      <TitleH1>デートコース詳細ページ</TitleH1>
        <div className='xl:mx-16 lg:mx-4 md:my-10 md:mx-2 md:text-4xl mobile(L):text-xl py-2 mx-20 text-sm font-bold'>
          {travelModeText}で移動<br/>
          他のユーザーに{courseInfo.authority}
          <div className='my-2 flex m-auto'>
            {
              courseInfo.noDuplicatePrefectureNames.map((prefectureName) => (
                <div key={prefectureName} className='border-2 bg-red-300 border-red-300 text-white rounded-xl p-1 mr-2'>{prefectureName}</div>
              ))
            }
          </div>
        </div>
      <CourseAreaDiv>
        <div className='md:w-1/3 w-full'>
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
        <div className='md:w-2/3 md:mt-0 md:mx-3 md:h-auto h-96 w-full mt-10 mx-0 rounded-xl'>
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
        {/* <div className='m-auto text-xl font-bold border p-2 flex rounded-xl w-1/2 bg-gray-200'> */}
        <ButtonParentDiv>
        <Link to={`/users/${managementCourses.userId}`}>
          <BaseButton>
              投稿者のページへ
          </BaseButton>
          </Link>
        </ButtonParentDiv>
      </ButtonArea>
    </MainDiv>
  );
});