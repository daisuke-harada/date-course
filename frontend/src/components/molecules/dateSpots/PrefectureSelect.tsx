import { memo, VFC } from "react";

import { areaDatas } from "datas/areaDatas";
import { prefectureDatas } from "datas/prefectureDatas";

type Props = {
  onChangeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue: string,
};


export const PrefectureSelect: VFC<Props> = memo((props) => {
  const {onChangeValue, defaultValue} = props
  return(
      <select className="mb-2 border-2 rounded-md" defaultValue={defaultValue} onChange={onChangeValue}>
        <option value="0">都道府県を選択してください</option>
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