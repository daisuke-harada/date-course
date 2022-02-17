import { memo, useEffect, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";
import { useParams } from "react-router-dom";
import { client } from "lib/api/client";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const {id} = useParams();
  useEffect(() => {
    console.log(id);
    client.get(`users/${id}`).then(response => {
      console.log(response.data.user);
    });
  });
  return(
    <>
      <h1>userのshowページです</h1>
      {getLoginStatus.status && 'ログインしてるよー' }
    </>
  );
});