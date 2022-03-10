import { memo, VFC } from "react";

import { genreDatas } from "datas/genreDatas";

type Props = {
  onChangeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue: string,
  dataE2e?: string,
};

export const GenreSelect: VFC<Props> = memo((props) => {
  const {onChangeValue, defaultValue, dataE2e} = props
  return(
    <select data-e2e={dataE2e} className="mb-2 border-2 rounded-md" defaultValue={defaultValue} onChange={onChangeValue}>
      <option value="0">ジャンルを選択してください</option>
      {genreDatas.map((genre) => (<option key={genre.id} value={genre.id}>{genre.name}</option>))}
    </select>
  );
});