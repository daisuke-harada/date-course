import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";
import { Link, useNavigate, useParams } from "react-router-dom";
import tw from 'tailwind-styled-components';

import { client } from "lib/api/client";
import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/users/UserImage";
import { FollowAndUnFollowButton } from "components/atoms/button/FollowAndUnFollowButton";
import { UserResponseData } from "types/users/response";

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
    }).catch(error => {
      navigate("/*");
    });

    if(user.gender === '女性'){
      setGenderTextColor('text-red-400');
    }else if(user.gender === '男性'){
      setGenderTextColor('text-blue-400');
    };

  }, [id, user, navigate]);

  return(
    <Div>
      <h1>ユーザーの詳細ページです</h1>
      <P><UserImage addClassName='w-64 h-64' userId={user.id} gender={user.gender}/></P>
      <P>
        <Span className={genderTextColor}>{user.name}</Span>
        <Span className={genderTextColor}>{user.gender}</Span>
        <Span><FollowAndUnFollowButton userId={user.id} /></Span>
      </P>
      <P>
        <Span>
          <Link to={`/users/${user.id}/followings`}>
            フォロー {user.followingIds.length}
          </Link>
        </Span>
        <Span>
          <Link to={`/users/${user.id}/followers`}>
              フォロワー {user.followerIds.length}
          </Link>
        </Span>
      </P>
      {(getLoginStatus.status && getCurrentUser.user.id === Number(id))
        &&
        <BaseButton>
          <Link className="text-white" to={`edit`}>アカウント情報編集</Link>
        </BaseButton>
      }
    </Div>
  );
});