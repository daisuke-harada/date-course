import { memo, VFC } from 'react';

import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';

export const New: VFC = memo(() => {
  return(
    <DateSpotForm
     dateSpotFormTitle='デートスポットの新規登録'
     formButtonName='登録'
     nameDefaultValue=''
     prefectureDefaultValue=''
     cityNameDefaultValue=''
     genreDefaultValue=''
     openingTimeDefaultValue=''
     closingTimeDefaultValue=''
    />
  );
});