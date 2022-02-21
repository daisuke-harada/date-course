import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";
import { Link, useNavigate, useParams } from "react-router-dom";
import { client } from "lib/api/client";
import { BaseButton } from "components/atoms/button/BaseButton";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  const {id} = useParams();
  const [userName, setUserName] = useState<String>("");
  const [userGender, setUserGender] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUserName(response.data.user.name);
      setUserGender(response.data.user.gender);
    }).catch(error => {
      navigate("/*");
    });
  }, [setUserName, setUserGender, navigate, id]);

  return(
    <>
      <h1>userのshowページです</h1>
      <p>{userName}</p>
      <p>{userGender}</p>
      {getLoginStatus.status && 'ログインしてるよー' }
      {(getCurrentUser.user.id === Number(id))
        &&
        <BaseButton>
          <Link className="text-white" to={`edit`}>ユーザー編集ページ</Link>
        </BaseButton>
      }
    </>
  );
});