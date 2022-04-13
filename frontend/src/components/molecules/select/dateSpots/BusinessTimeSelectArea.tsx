import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { memo, VFC } from 'react';

type Props = {
  onChangeOpeningTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultOpeningTimeValue: string,
  onChangeClosingTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultClosingTimeValue: string,
  openingDataE2e?: string,
  closingDataE2e?: string,
};

export const BusinessTimeSelectArea: VFC<Props> = memo((props) => {
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
      <p>営業時間</p>
      <p className='mb-5 border-b-2 outline-none'>
        <label>始業時間</label>
        <BusinessTimeSelect dataE2e={openingDataE2e} timeValue={defaultOpeningTimeValue} onChangeTimeValue={onChangeOpeningTimeValue} />
            ~
        <label>終業時間</label>
        <BusinessTimeSelect dataE2e={closingDataE2e} timeValue={defaultClosingTimeValue} onChangeTimeValue={onChangeClosingTimeValue} />
      </p>
    </>
  );
});