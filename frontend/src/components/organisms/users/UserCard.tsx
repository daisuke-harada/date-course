import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';

import { UserResponseData } from "types/users/response";
import { Card } from "components/atoms/card/Card";
import { Link } from "react-router-dom";
import { UserImage } from "components/atoms/layouts/UserImage";

type Props = {
  user: UserResponseData
};

const Span = tw.span`m-2 font-bold`;
const DD = tw.dd`m-5`;

export const UserCard: VFC<Props> = memo((props) => {
  const { user } = props;
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    if(user.gender === '女'){
      setGenderTextColor('text-red-400 hover:text-yellow-500');
    }else if(user.gender === '男'){
      setGenderTextColor('text-blue-400 hover:text-yellow-500');
    };
  }, [user]);

  return(
    <Card>
      <DD>
        <UserImage addClassName="w-64 h-64" userId={user.id} image={user.image} gender={user.gender} />
      </DD>
      <DD>
        <Link to={`/users/${user.id}`}>
          <Span className={genderTextColor}>
            {user.name}
          </Span>
          <Span className={genderTextColor} >
            {user.gender}
          </Span>
        </Link>
        {/* <%= render 'relationships/follow_button', user: user %> */}
        {/* フォローボタン */}
        <button>フォローボタン</button>
      </DD>
      <DD>
        <Span>
          {/* <%= render 'relationships/following_count', user: user %> */}
          {/* フォローしている数 */}
          フォロー 3
        </Span>
        <Span>
          {/* <%= render 'relationships/followers_count', user: user %> */}
          {/* フォロワーの数 */}
          フォロワー 3
        </Span>
      </DD>
    </Card>
  );
});