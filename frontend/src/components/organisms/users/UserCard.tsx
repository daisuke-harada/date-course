import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';

import { UserResponseData } from "types/api/response";
import { Card } from "components/atoms/card/Card";

type Props = {
  user: UserResponseData
};

const Span = tw.span`m-2 font-bold`

export const UserCard: VFC<Props> = memo((props) => {
  const { user } = props;
  const [userImage, setUserImage] = useState('http://localhost:7777/images/no_image.jpg');
  const [genderColor, setGenderColor] = useState('');

  useEffect(() => {
    user.image && user.image.url !== null && setUserImage(user.image.url);
    if(user.gender === '女'){
      setGenderColor('border-red-400');
    }else if(user.gender === '男'){
      setGenderColor('border-blue-400');
    };
  }, [setUserImage, user, setGenderColor]);

  return(
    <Card>
      <dd className="m-5">
        <img className={`${genderColor} w-64 h-64 rounded-xl border-4`} src={userImage} alt="UserProfileImage"/>
      </dd>
      <dd className="m-5">
        <Span>
          {user.name}
        </Span>
        <Span>
          {user.gender}
        </Span>
        {/* <%= render 'relationships/follow_button', user: user %> */}
        {/* フォローボタン */}
        <button>フォローボタン</button>
      </dd>
      <dd className="m-2">
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
      </dd>
    </Card>
  );
});