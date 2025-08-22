import { businessTimeDatas } from 'datas/businessTimeDatas';
import { memo, FC } from 'react';

type Props = {
  onChangeTimeValue: React.ChangeEventHandler<HTMLSelectElement>,
  value?: string,
  dataE2e?: string,
  addClassName?: string
};

export const BusinessTimeSelect: FC<Props> = memo((props) => {
  const {dataE2e, value = '', onChangeTimeValue, addClassName} = props
  return(
    <select className={`text-xs ${addClassName}`} data-e2e={dataE2e} value={value ?? ''} onChange={onChangeTimeValue}>
      {businessTimeDatas.map((businessTime) => (<option key={businessTime.value_time} value={businessTime.value_time}>{businessTime.time}</option>))}
    </select>
  );
});