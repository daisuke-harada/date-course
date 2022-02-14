import { memo, VFC } from "react"

type Props = {
  loggedInStatus: boolean;
}

export const Top: VFC<Props> = memo((props) => {
  const { loggedInStatus } = props;
  return(
    <>
      {loggedInStatus && (<h1>ログイン状態です</h1>)}
      <h1 className="text-indigo-900">トップページです</h1>
    </>
  );
});