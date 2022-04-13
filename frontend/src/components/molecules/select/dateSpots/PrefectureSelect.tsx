import { memo, VFC } from 'react';

import { areaDatas } from 'datas/areaDatas';
import { prefectureDatas } from 'datas/prefectureDatas';

type Props = {
  onChangeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue: string,
  dataE2e?: string,
  addClassName?: string
};


export const PrefectureSelect: VFC<Props> = memo((props) => {
  const {onChangeValue, defaultValue, dataE2e, addClassName} = props
  return(
      <select data-e2e={dataE2e} className={`mb-2 lg:text-lg text-xs border-2 rounded-md ${addClassName}`} defaultValue={defaultValue} onChange={onChangeValue}>
        <option value=''>都道府県</option>
        {areaDatas.map((area) => (
          <optgroup key={area.id} label={area.name}>
            {prefectureDatas
              .filter(prefecture => prefecture.areaId === area.id)
              .map((prefecture) => (<option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>))
            }
          </optgroup>
        ))}
      </select>
  );
});