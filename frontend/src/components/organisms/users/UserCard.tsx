import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';

import { UserResponseData } from "types/users/response";
import { Card } from "components/atoms/card/Card";
import { Link } from "react-router-dom";

type Props = {
  user: UserResponseData
};

const Span = tw.span`m-2 font-bold`;
const Image = tw.img`w-64 h-64 rounded-xl border-4`;
const DD = tw.dd`m-5`;

export const UserCard: VFC<Props> = memo((props) => {
  const { user } = props;
  const [userImage, setUserImage] = useState('http://localhost:7777/images/no_image.jpg');
  const [genderBorderColor, setGenderBorderColor] = useState('');
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    user.image && user.image.url !== null && setUserImage(user.image.url);
    if(user.gender === '女'){
      setGenderBorderColor('border-red-400 hover:border-red-500');
      setGenderTextColor('text-red-400 hover:text-yellow-500');
    }else if(user.gender === '男'){
      setGenderBorderColor('border-blue-400 hover:border-blue-500');
      setGenderTextColor('text-blue-400 hover:text-yellow-500');
    };
  }, [user]);

  return(
    <Card>
      <DD>
        <Link to={`/users/${user.id}`}>
          <Image className={genderBorderColor} src={userImage} alt="UserProfileImage"/>
        </Link>
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