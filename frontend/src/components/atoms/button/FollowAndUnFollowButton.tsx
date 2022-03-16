import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  dataE2e?: string,
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>,
};

const Button = tw.button`btn btn-yellow-green text-sm`

export const FollowAndUnFollowButton: VFC<Props> = memo((props) => {
  const {dataE2e, onClickEvent} = props;
  return(
      <Button data-e2e={dataE2e} onClick={onClickEvent}>フォロー</Button>
  );
});