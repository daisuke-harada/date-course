import { BaseButton } from 'components/atoms/button/BaseButton';
import { UserImage } from 'components/atoms/imageLayouts/users/UserImage';
import { DuringSpotCard } from 'components/organisms/card/courses/DuringSpotCard';
import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { CourseResponseData } from 'types/courses/response';

const MainDiv = tw.div`mobile(L):w-auto w-full border px-2 bg-white rounded-3xl mx-2 mb-5 shadow-xl`;
const DuringSpotsDiv = tw.div`flex justify-evenly`;
const MainDl = tw.dl`text-left mb-5`
const DD = tw.dd`mobile(M):text-base text-xs m-2 font-bold`;

type Props ={
  course: CourseResponseData
}

export const CourseCard: VFC<Props> = memo((props) =>{
  const { course } = props;

  return(
    <MainDiv>
      <div className='ml-1 pt-2 flex'>
        <UserImage
          addClassName='w-24 h-24'
          image={course.user.image}
          userId={course.user.id}
          gender={course.user.gender}
        />
        <MainDl>
          <DD className='pl-2'>
            <Link to={`/users/${course.user.id}`}>
              {course.user.name}さんの投稿
            </Link>
          </DD>
          <DD className='pl-2 flex overflow-x-scroll whitespace-nowrap'>
            {
              course.noDuplicatePrefectureNames.map((prefectureName) => (
                <div key={prefectureName} className='border-2 bg-red-300 border-red-300 text-white rounded-xl p-1 mr-2'>
                  {prefectureName}
                </div>
              ))
            }
          </DD>
        </MainDl>
      </div>
      <DuringSpotsDiv>
        {
          course.courseDuringSpots.map(
            (courseDuringSpot, index) => (
              index <= 2
              &&
                <DuringSpotCard key={index} duringSpot={courseDuringSpot} />
            )
          )
        }
        {
          course.courseDuringSpots.length < 3
          &&
          <div className='bg-white rounded-xl shadow-xl m-1'>
            <div className='mobile(M):w-24 mobile(M):h-24 w-20 h-20 rounded-t-xl bg-gray-400'>
              <div className='text-xs text-center font-bold pt-10'>
                未登録
              </div>
            </div>
            <div className='font-bold text-xs text-center mobile(M):w-24 w-20'>
              <p className='my-2'>
                未登録
              </p>
            </div>
          </div>
        }
      </DuringSpotsDiv>
      <div className='text-center sm:text-lg text-xs my-5 font-bold m-auto w-2/3'>
        <Link to={`/courses/${course.id}`}>
          <BaseButton>
            詳細を見る
          </BaseButton>
        </Link>
      </div>
    </MainDiv>
  );
});