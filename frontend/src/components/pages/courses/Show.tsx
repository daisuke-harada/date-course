import { memo, useCallback, useEffect, useState, FC } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { CourseInfoData, ManagementCourseData } from 'types/managementCourses/management';
import { Loading } from 'components/pages/Loading';
import { CopyCourseButton } from 'components/atoms/button/courses/CopyCourseButton';
import { MoveGoogleMapButton } from 'components/atoms/button/courses/MoveGoogleMapButton';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { Directions } from 'components/molecules/maps/Directions';
import { CourseDuringSpotCard } from 'components/organisms/card/managementCourses/CourseDuringSpotCard';
import { client } from 'lib/api/client';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { useSelector } from 'react-redux';

const MainDiv = tw.div`md:mx-20 mx-2 px-2 bg-white mt-10 py-5 shadow-xl rounded-2xl`;
const TitleH1 = tw.h1`mobile(L):text-4xl text-center mt-5 font-bold pb-5`;
const CourseAreaDiv = tw.div`flex-col md:flex-row w-full flex`;
const ButtonArea = tw.div`flex flex-col items-center mx-5 my-10`;
const ButtonParentDiv = tw.div`lg:text-4xl sm:w-1/2 sm:text-2xl text-center m-5 w-3/4`

export const Show: FC = memo(() => {
  const { id } = useParams();
  const [managementCourse, setmanagementCourse] = useState<ManagementCourseData>({
    userId: 0,
    dateSpots: []
  });

  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    travelMode: 'DRIVING',
    authority: '公開',
    noDuplicatePrefectureNames: []
  });

  // デートコースの距離、時間を管理するステートを設定
  const [legs, setLegs] = useState<{duration: string, distance: string}[]>([]);
  const navigate = useNavigate();
  const [travelModeText, setTravelModeText] = useState('');
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)

  const onClickDeleteCourse = useCallback(()=>{
    client.delete(`courses/${id}`).then(response => {
      response.status === 204 && navigate(`/users/${currentUser.id}`, {state: {message: 'デートコースを削除しました', type: 'success-message', condition: true}});
    });
  },[id, currentUser.id, navigate]);

  useEffect(() => {
    client.get(`courses/${id}`).then(response => {
      setmanagementCourse({userId: response.data.user.id, user: response.data.user, dateSpots: response.data.dateSpots});
      setCourseInfo({travelMode: response.data.travelMode, authority: response.data.authority, noDuplicatePrefectureNames: response.data.noDuplicatePrefectureNames});
      if(response.data.travelMode === 'DRIVING'){
        setTravelModeText('車');
      }else if(response.data.travelMode === 'BICYCLING'){
        setTravelModeText('自転車');
      }else{
        setTravelModeText('歩き');
      }
    });
  }, [id]);

  return(
    <Loading loadingSwitch={managementCourse.userId === 0 && true}>
      <MainDiv>
        <TitleH1>デートコース詳細ページ</TitleH1>
        <div className='lg:ml-6 sm:ml-2 py-3 md:text-4xl mobile(L):text-xl text-sm font-bold'>
          {travelModeText}で移動<br/>
          他のユーザーに{courseInfo.authority}
          <div className='my-2 flex m-auto'>
            {
              courseInfo.noDuplicatePrefectureNames?.map((prefectureName) => (
                <div key={prefectureName} className='border-2 bg-red-300 border-red-300 text-white rounded-xl p-1 mr-2'>{prefectureName}</div>
              ))
            }
          </div>
        </div>
        <CourseAreaDiv>
          <div className='md:w-1/3 w-full'>
            {
              managementCourse.dateSpots.map((courseDuringSpot, index) => (
                <CourseDuringSpotCard
                  key={courseDuringSpot.id}
                  courseDuringSpot={courseDuringSpot}
                  managementCourse={managementCourse}
                  courseNumber={index}
                  leg={legs[index]}
                />
              ))
            }
          </div>
          <div className='md:w-2/3 md:mt-0 md:mx-3 md:h-auto h-96 w-full mt-10 mx-0 rounded-xl'>
            {
              // userIdが初期値である0の場合に読み込まないようにする
              managementCourse.userId !== 0
              &&
              <Directions managementCourse={managementCourse} setLegs={setLegs} travelMode={courseInfo.travelMode} />
            }
          </div>
        </CourseAreaDiv>
        <ButtonArea>
          <ButtonParentDiv>
            <Link to={`/users/${managementCourse.userId}`}>
              <BaseButton>
                  投稿者のページへ
              </BaseButton>
            </Link>
          </ButtonParentDiv>
          <ButtonParentDiv>
            <MoveGoogleMapButton dateSpots={managementCourse.dateSpots} />
          </ButtonParentDiv>
          <ButtonParentDiv>
            <CopyCourseButton managementCourse={managementCourse} courseInfo={courseInfo} />
          </ButtonParentDiv>
          {
            currentUser.id === managementCourse.userId
            &&
            (
              <>
                <ButtonParentDiv>
                  <DangerButton onClickEvent={onClickDeleteCourse}>
                    デートコースを削除
                  </DangerButton>
                </ButtonParentDiv>
              </>
            )
          }
        </ButtonArea>
      </MainDiv>
    </Loading>
  );
});