import { memo, FC } from 'react';

import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';

type Props = {
  onChangeOpeningTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultOpeningTimeValue: string,
  onChangeClosingTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultClosingTimeValue: string,
  openingDataE2e?: string,
  closingDataE2e?: string,
};

export const BusinessTimeSelectArea: FC<Props> = memo((props) => {
  const {
    onChangeOpeningTimeValue,
    defaultOpeningTimeValue,
    onChangeClosingTimeValue,
    defaultClosingTimeValue,
    openingDataE2e,
    closingDataE2e,
  } = props

  return(
    <>
      <div>営業時間</div>
      <div className='mb-5 border-b-2 outline-none'>
        <label>始業時間</label>
        <BusinessTimeSelect dataE2e={openingDataE2e} value={defaultOpeningTimeValue} onChangeTimeValue={onChangeOpeningTimeValue} />
            ~
        <label>終業時間</label>
        <BusinessTimeSelect dataE2e={closingDataE2e} value={defaultClosingTimeValue} onChangeTimeValue={onChangeClosingTimeValue} />
      </div>
    </>
  );
});