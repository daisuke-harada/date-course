import { businessTimeDatas } from "datas/businessTimeDatas";
import { memo, VFC } from "react";

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
      <p className="mb-5 border-b-2 outline-none">
        <label>始業時間</label>
        <select data-e2e={openingDataE2e} defaultValue={defaultOpeningTimeValue} onChange={onChangeOpeningTimeValue}>
          {businessTimeDatas.map((businessTime) => (<option key={businessTime.value_time} value={businessTime.value_time}>{businessTime.time}</option>))}
        </select>
            ~
        <label>終業時間</label>
        <select data-e2e={closingDataE2e} defaultValue={defaultClosingTimeValue} onChange={onChangeClosingTimeValue}>
          {businessTimeDatas.map((businessTime) => (<option key={businessTime.value_time} value={businessTime.value_time}>{businessTime.time}</option>))}
        </select>
      </p>
    </>
  );
});