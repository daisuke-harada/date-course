import { memo, VFC } from "react";

type Props = {
  isOpen: boolean
}
export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen } = props;
  return(
  <div className={`${isOpen? `fixed`: `hidden`} lg:hidden bg-red-300 z-50 w-2/3 right-0`}>
    <button>ありがとう</button>
    <ul>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
      <li className="block border-t-2 px-8 py-2 hover:bg-gray-600">HRとは</li>
    </ul>
  </div>
  );
});