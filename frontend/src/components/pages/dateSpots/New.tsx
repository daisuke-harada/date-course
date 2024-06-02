import { memo, FC } from 'react';

import { DateSpotForm } from 'components/templates/dateSpots/DateSpotForm';

export const New: FC = memo(() => {
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