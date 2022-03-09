import { DateSpotForm } from "components/templates/dateSpots/DateSpotForm";
import { memo, VFC } from "react";

export const New: VFC = memo(() => {
  return(
    <DateSpotForm
     dateSpotFormTitle="デートスポットの新規登録"
     formButtonName="登録"
     nameDefaultValue=""
     prefectureDefaultValue="0"
     cityNameDefaultValue=""
     genreDefaultValue="0"
     openingTimeDefaultValue=""
     closingTimeDefaultValue=""
    />
  );
});