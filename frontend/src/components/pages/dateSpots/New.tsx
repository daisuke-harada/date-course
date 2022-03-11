import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';
import { memo, VFC } from 'react';

export const New: VFC = memo(() => {
  return(
    <DateSpotForm
     dateSpotFormTitle='デートスポットの新規登録'
     formButtonName='登録'
     baseBtnDataE2e='dateSpot-regist-button'
     nameDefaultValue=''
     prefectureDefaultValue=''
     cityNameDefaultValue=''
     genreDefaultValue=''
     openingTimeDefaultValue=''
     closingTimeDefaultValue=''
    />
  );
});