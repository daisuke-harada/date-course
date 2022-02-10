import { memo, VFC } from "react";

type Props = {
  isOpen: boolean
}
export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen } = props;
  return(
  <div className={`${isOpen? `fixed`: `hidden`} lg:hidden sm:top-24 top-20 text-center border border-red-200 bg-red-200 z-50 w-2/3 right-0`}>
    <ul>
      <li>ありがとう</li>
    </ul>
  </div>
  );
});