import { memo, VFC } from "react";

type Props = {
  isOpen: boolean
}
export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen } = props;
  return(
  <div className={`${isOpen? `fixed`: `hidden`} lg:hidden sm:top-24 top-20 border border-red-200 bg-red-200 z-50 w-2/3 right-0`}>
    <ul>
      <li className="block border-b-2 px-8 py-2 hover:bg-red-300">HRとは</li>
      <li className="block px-8 py-2 hover:bg-red-300">HRとは</li>
    </ul>
  </div>
  );
});