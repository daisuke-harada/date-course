import { memo, useEffect, useState, FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';

import { client } from 'lib/api/client';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { UserImage } from 'components/atoms/imageLayouts/users/UserImage';
import { FollowAndUnFollowButton } from 'components/atoms/button/users/FollowAndUnFollowButton';
import { UserResponseData } from 'types/users/response';
import { FollowingsAndFollowersLinkArea } from 'components/organisms/area/users/FollowingsAndFollowersLinkArea';
import { UserShowPageMenu } from 'components/organisms/menu/users/UserShowPageMenu';
import { CourseResponseData } from 'types/courses/response';
import { DateSpotReviewAndDateSpotResponseData } from 'types/dateSpotReviews/response';
import { Loading } from '../Loading';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

const Span = tw.span`my-1 font-bold`;
const ProfileDiv = tw.div`sm:my-8 my-4 mx-2 flex w-full`;

export const Show: FC = memo(() => {
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)
  const { id } = useParams();
  const [user, setUser] = useState<UserResponseData>(
    {
      id: 0,
      name: '',
      email: '',
      gender: '男性',
      admin: false,
      image: {
        url: null
      },
      followingIds: [],
      followerIds: [],
    }
  );
  const [courses, setCourses] = useState<CourseResponseData[]>([]);
  const [dateSpotReviews, setDateSpotReviews] = useState<DateSpotReviewAndDateSpotResponseData[]>([]);
  const navigate = useNavigate();
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUser(response.data);
      setCourses(response.data.courses);
      setDateSpotReviews(response.data.dateSpotReviews);
      if(response.data.gender === '女性'){
        setGenderTextColor('text-red-400');
      }else if(response.data.gender === '男性'){
        setGenderTextColor('text-blue-400');
      };
    });
  }, [id, navigate]);

  return(
    <Loading loadingSwitch={user.id === 0 && true}>
      <div className='flex flex-col m-auto'>
        <ProfileDiv>
          <div className='w-1/3 lg:w-1/4 lg:mr-8 xl:w-1/5 '>
            <UserImage
              addClassName='mobile(M):w-28 mobile(M):h-28 mobile(L):w-32 mobile(L):h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 w-24 h-24'
              image={user.image}
              userId={user.id}
              gender={user.gender}
            />
          </div>
          <div className='w-2/3 lg:w-3/4 flex flex-col'>
            <Span
              className={
                `${genderTextColor} mobile(M):mt-10 mobile(L):mt-14 mobile(L):text-sm sm:text-2xl sm:mt-24 md:text-3xl md:mt-32 lg:text-5xl lg:mb-4 mt-7`
              }
            >
              {user.name}
            </Span>
            <Span
              className={
                `${genderTextColor} text-xs sm:text-xl md:text-2xl lg:text-4xl lg:mb-4`
              }
            >
              {user.gender}
            </Span>
            <Span><FollowAndUnFollowButton addClassName='mobile(L):text-sm mofile(M):w-1/3 sm:text-2xl text-xs mt-0' userId={user.id} setUser={setUser} /></Span>
            <Span className='md:w-1/6 sm:w-1/4 mobile(L):text-sm sm:text-2xl text-xs mt-0 w-1/3'>
              {(loginStatus && currentUser.id === Number(id))
                &&
                <Link className='text-white' to={`edit`}>
                  <BaseButton>
                    設定
                  </BaseButton>
                </Link>
              }
            </Span>
          </div>
        </ProfileDiv>
        <div>
          <FollowingsAndFollowersLinkArea
            userId={user.id}
            followingIdsCount={user.followingIds.length}
            followerIdsCount={user.followerIds.length}
          />
        </div>
        <UserShowPageMenu courses={courses} userId={Number(id)} dateSpotReviews={dateSpotReviews} />
      </div>
    </Loading>
  );
});
