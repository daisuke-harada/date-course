import { businessTimeDatas } from "datas/businessTimeDatas";
import { memo, VFC } from "react";

type Props = {
  onChangeTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  timeValue: string,
  dataE2e?: string,
  addClassName?: string
};



export const BusinessTimeSelect: VFC<Props> = memo((props) => {
  const {dataE2e, timeValue, onChangeTimeValue, addClassName} = props
  return(
    <select className={`text-xs ${addClassName}`} data-e2e={dataE2e} defaultValue={timeValue} onChange={onChangeTimeValue}>
      {businessTimeDatas.map((businessTime) => (<option key={businessTime.value_time} value={businessTime.value_time}>{businessTime.time}</option>))}
    </select>
  );
});