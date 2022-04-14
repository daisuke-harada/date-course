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

const Span = tw.span`m-2 font-bold`;
const Div = tw.div`m-5`;
const P = tw.div`my-4`;

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
    <Div>
      <P><UserImage addClassName='w-64 h-64' image={user.image} userId={user.id} gender={user.gender}/></P>
      <P>
        <Span className={genderTextColor}>{user.name}</Span>
        <Span className={genderTextColor}>{user.gender}</Span>
        <Span><FollowAndUnFollowButton userId={user.id} setUser={setUser} /></Span>
      </P>
      <P>

        <FollowingsAndFollowersLinkArea
          userId={user.id}
          followingIdsCount={user.followingIds.length}
          followerIdsCount={user.followerIds.length}
        />
      </P>
      {(getLoginStatus.status && getCurrentUser.user.id === Number(id))
        &&
        <BaseButton>
          <Link className='text-white' to={`edit`}>アカウント情報編集</Link>
        </BaseButton>
      }
    </Div>
  );
});