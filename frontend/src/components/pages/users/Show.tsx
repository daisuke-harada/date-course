import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";
import { useParams } from "react-router-dom";
import { client } from "lib/api/client";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const {id} = useParams();
  const [userName, setUserName] = useState<String>("");
  const [userGender, setUserGender] = useState<String>("");

  useEffect(() => {
    console.log(id);
    client.get(`users/${id}`).then(response => {
      setUserName(response.data.user.name);
      setUserGender(response.data.user.gender);
    });
  }, [setUserName, setUserGender, id]);
   console.log(userName);
  return(
    <>
      <h1>userのshowページです</h1>
      <p>{userName}</p>
      <p>{userGender}</p>
      {getLoginStatus.status && 'ログインしてるよー' }
    </>
  );
});