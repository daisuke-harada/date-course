import { memo, useState, VFC } from "react";
import { User } from "types/api/session";
//import { User } from "types/api/response";

type Props = {
  user: User
};

export const UserCard: VFC<Props> = memo((props) => {
  const { user } = props;
  const [userImage, setUserImage] = useState('http://localhost:7777/images/no_image.jpg');
  user.image && setUserImage(user.image.url);
  return(
    <>
      <div className="m-5">
        <img className='w-64 h-64' src={userImage} alt="UserProfileImage"/>
      </div>
      <div className="m-5 flex">
        <span className="mx-5 font-bold">
          {user.name}
          {user.gender}
        </span>
        {/* <%= render 'relationships/follow_button', user: user %> */}
        {/* フォローボタン */}
      </div>
      <p className="m-2">
        <span id ="followings_count_user_id_<%= user.id %>" className="m-2" >
          {/* <%= render 'relationships/following_count', user: user %> */}
          {/* フォローしている数 */}
        </span>
        <span id ="followers_count_user_id_<%= user.id %>" className="m-2" >
          {/* <%= render 'relationships/followers_count', user: user %> */}
          {/* フォロワーの数 */}
        </span>
      </p>
    </>
  );
});