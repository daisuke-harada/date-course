import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";
import { Link, useNavigate, useParams } from "react-router-dom";
import { client } from "lib/api/client";
import { BaseButton } from "components/atoms/button/BaseButton";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  const { id } = useParams();
  const [userName, setUserName] = useState<string>("");
  const [userGender, setUserGender] = useState<string>("");
  const [userImage, setUserImage] = useState('http://localhost:7777/images/no_image.jpg');
  const navigate = useNavigate();

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUserName(response.data.user.name);
      setUserGender(response.data.user.gender);
      response.data.user.image.url && setUserImage(response.data.user.image.url);
      console.log(response.data.user);
    }).catch(error => {
      navigate("/*");
    });
  }, [setUserName, setUserGender, navigate, id]);

  return(
    <>
      <h1>ユーザーの詳細ページです</h1>
      <p><img className='w-64 h-64' src={userImage} alt="UserProfileImage"/></p>
      <p>{userName}</p>
      <p>{userGender}</p>
      {getLoginStatus.status && 'ログインしてるよー' }
      {(getLoginStatus.status && getCurrentUser.user.id === Number(id))
        &&
        <BaseButton>
          <Link className="text-white" to={`edit`}>アカウント情報編集</Link>
        </BaseButton>
      }
    </>
  );
});