import { memo, VFC } from "react";
import { AddressResponseData, DateSpotResponseData } from "types/dateSpots/response";

import { UserResponseData } from "types/users/response";

type Props = {
  dateSpots: Array<DateSpotResponseData>
  addresses: Array<AddressResponseData>
};

export const DateSpots: VFC<Props> = memo((props) => {
  const { dateSpots, addresses } = props;
  return(
    <div className='flex flex-wrap justify-center'>
      {/* {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} />))} */}
    </div>
  );
});