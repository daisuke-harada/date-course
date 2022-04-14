import { memo, useEffect, useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';
import { Link, useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { client } from 'lib/api/client';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { UserImage } from 'components/atoms/layouts/users/UserImage';
import { FollowAndUnFollowButton } from 'components/atoms/button/FollowAndUnFollowButton';
import { UserResponseData } from 'types/users/response';
import { FollowingsAndFollowersLinkArea } from 'components/organisms/area/users/FollowingsAndFollowersLinkArea';
import { UserShowPageMenu } from 'components/organisms/menu/users/UserShowPageMenu';
import { CourseResponseData } from 'types/courses/response';

const Span = tw.span`my-1 font-bold`;
const ProfileDiv = tw.div`sm:my-8 my-4 mx-2 flex w-full`;

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  const { id } = useParams();
  const [user, setUser] = useState<UserResponseData>(
    {
      id: 0,
      name: '',
      email: '',
      gender: '男性',
      passwordDigest: '',
      admin: false,
      image: {
        url: null
      },
      followingIds: [],
      followerIds: [],
    }
  );
  const [courses, setCourses] = useState<CourseResponseData[]>([]);
  const navigate = useNavigate();
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUser(response.data.user);
      setCourses(response.data.courses);
      if(response.data.user.gender === '女性'){
        setGenderTextColor('text-red-400');
      }else if(response.data.user.gender === '男性'){
        setGenderTextColor('text-blue-400');
      };

    }).catch(error => {
      navigate('/*');
    });
  }, [id, navigate]);

  return(
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
            {user.name}({user.gender})
          </Span>
          <Span><FollowAndUnFollowButton addClassName='mobile(L):text-sm mofile(M):w-1/3 sm:text-2xl text-xs mt-0' userId={user.id} setUser={setUser} /></Span>
          <Span className='mobile(L):text-sm sm:text-2xl text-xs mt-0 w-1/3'>
            {(getLoginStatus.status && getCurrentUser.user.id === Number(id))
              &&
              <BaseButton>
                <Link className='text-white' to={`edit`}>設定</Link>
              </BaseButton>
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
      <UserShowPageMenu courses={courses} />
    </div>
  );
});