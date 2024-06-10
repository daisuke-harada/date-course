import { CourseDuringSpotCard } from 'components/organisms/card/managementCourses/CourseDuringSpotCard';
import { memo, useEffect, useState, FC } from 'react';
import { useRecoilState } from 'recoil';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';

import { managementCourseState, courseInfoState } from 'store/managementCourse';
import { Directions } from 'components/molecules/maps/Directions';
import { LoadScript } from '@react-google-maps/api';
import { Map } from 'components/molecules/maps/Map';
import { CourseInfoSelect } from 'components/molecules/select/managementCourses/CourseInfoSelect';
import { ManagementCourseButtonArea } from 'components/organisms/area/courses/ManagementCourseButtonArea';
import { Link } from 'react-router-dom';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

const MainDiv = tw.div`md:mx-20 mx-2 px-2 bg-white mt-10 py-5 shadow-xl rounded-2xl`;
const CourseNotExistDiv = tw.div`text-center sm:text-2xl m-auto my-5 text-blue-600 mobile(L):text-lg text-sm`;
const CourseParentButtonDiv = tw.div`xl:w-1/4 lg:text-xl md:w-1/3 md:text-base mobile(L):w-1/2 mobile(L):text-sm w-3/4 text-xs m-auto mb-5`;
const TitleH1 = tw.h1`mobile(L):text-4xl text-center mt-2 font-bold pb-5`;
const CourseAreaDiv = tw.div`flex-col md:flex-row w-full flex`;

export const CreateCourse: FC = memo(() => {
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.id}));
  const [getCourseInfo, setCourseInfo] = useRecoilState(courseInfoState({userId: getCurrentUser.id}));
  const [noDuplicatePrefectureNames, setNoDuplicatePrefectureNames] = useState<string[]>([]);

  // デートコースの距離、時間を管理するステートを設定
  const [legs, setLegs] = useState<{duration: string, distance: string}[]>([]);

  useEffect(() => {
    const prefectureNames = managementCourses.dateSpots.map((duringSpot) => (duringSpot.prefectureName));
    setNoDuplicatePrefectureNames(Array.from(new Set(prefectureNames)));
  }, [managementCourses.dateSpots]);

  return(
    <>
      {
        managementCourses.dateSpots &&
        <MainDiv>
          <TitleH1>デートコース作成</TitleH1>
          {
            managementCourses.dateSpots.length === 0?
            <div className='flex flex-col mb-16 text-center'>
              <CourseNotExistDiv>
                  現在登録されていません。<br/>
                  デートコースを作成してみましょう。
              </CourseNotExistDiv>
              <CourseParentButtonDiv>
                <Link to='/dateSpots/index'>
                  <BaseButton>
                    デートスポットを探す
                  </BaseButton>
                </Link>
              </CourseParentButtonDiv>
              <CourseParentButtonDiv>
                <Link to='/courses/index'>
                  <SecondaryButton>
                    デートコースを探す
                  </SecondaryButton>
                </Link>
              </CourseParentButtonDiv>
            </div>
            :
            <>
              {
                managementCourses.dateSpots.length > 1
                &&
                <div className='w-full mt-5'>
                  <CourseInfoSelect setCourseInfo={setCourseInfo} getCourseInfo={getCourseInfo} noDuplicatePrefectureNames={noDuplicatePrefectureNames} />
                </div>
              }
              <CourseAreaDiv>
                <div className='md:w-1/3 w-full'>
                  {
                    managementCourses.dateSpots.map((courseDuringSpot, index) => (
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
                <div className='md:w-2/3 md:mt-0 md:mx-3 md:h-auto h-96 w-full mt-10 mx-0 rounded-xl'>
                  {
                    managementCourses.dateSpots.length === 1?
                    <Map  addressAndDateSpot={managementCourses.dateSpots[0]} />
                    :
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} >
                      <Directions managementCourses={managementCourses} setLegs={setLegs} travelMode={getCourseInfo.travelMode} />
                    </LoadScript>
                  }
                </div>
              </CourseAreaDiv>
            </>
          }
          <ManagementCourseButtonArea
            managementCourses={managementCourses}
            getCourseInfo={getCourseInfo}
          />
        </MainDiv>
      }
    </>
  );
});