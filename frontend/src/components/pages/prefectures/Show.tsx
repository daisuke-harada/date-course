import { DateSpots } from "components/templates/dateSpots/DateSpots";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export const Show: VFC = memo(() => {
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<Array<AddressAndDateSpotJoinData>>([]);
  const { id } = useParams();

  useEffect(() => {
    client.get(`prefectures/${id}`).then(response => {
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    })
  }, [id]);

  return(
    <>
      <h1 className='m-4'>デートスポットを探す</h1>
      <DateSpots addressAndDateSpots={addressAndDateSpots} />
    </>
  );
});