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

const Span = tw.span`my-1 font-bold`;
const Div = tw.div`m-5 flex`;

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
  const navigate = useNavigate();
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUser(response.data.user);
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
    <>
      <div className='mx-2 my-4 flex w-full'>
        <div className='w-1/3'><UserImage addClassName='w-24 h-24' image={user.image} userId={user.id} gender={user.gender}/></div>
        <div className='w-1/3 flex flex-col'>
          <Span className={`${genderTextColor} mt-7`}>{user.name}({user.gender})</Span>
          <Span><FollowAndUnFollowButton addClassName='text-xs' userId={user.id} setUser={setUser} /></Span>
          <Span className='text-xs mt-0'>
            {(getLoginStatus.status && getCurrentUser.user.id === Number(id))
              &&
              <BaseButton>
                <Link className='text-white' to={`edit`}>設定</Link>
              </BaseButton>
            }
          </Span>
        </div>
      </div>
      <FollowingsAndFollowersLinkArea
        userId={user.id}
        followingIdsCount={user.followingIds.length}
        followerIdsCount={user.followerIds.length}
      />
    </>
  );
});