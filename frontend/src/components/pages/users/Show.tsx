import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "lib/api/client";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const {id} = useParams();
  const [userName, setUserName] = useState<String>("");
  const [userGender, setUserGender] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    client.get(`users/${id}`).then(response => {
      setUserName(response.data.user.name);
      setUserGender(response.data.user.gender);
    }).catch(error => {
      console.log(error);
      navigate("/*");
    });
  }, [setUserName, setUserGender, navigate, id]);

  return(
    <>
      <h1>userのshowページです</h1>
      <p>{userName}</p>
      <p>{userGender}</p>
      {getLoginStatus.status && 'ログインしてるよー' }
    </>
  );
});