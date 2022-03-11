import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { AddressResponseData, DateSpotResponseData } from "types/dateSpots/response";

export const Index: VFC = memo(() => {
  // const [dateSpots, setDateSpots] = useState<DateSpotResponseData[]>();
  // const [addresses, setAddresses] = useState<AddressResponseData[]>();
  useEffect(() => {
    client.get('date_spots').then(response => {
      // setDateSpots(response.data.dateSpots);
      // setAddresses(response.data.addresses);
      console.log(response.data[0]);
    })
  }, []);
  // console.log(dateSpots);
  // console.log(addresses);
  return(
    <>
      <h1>デートスポットを探す</h1>
    </>
  );
});