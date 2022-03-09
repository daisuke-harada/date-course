import { memo, VFC } from "react";

import { genreDatas } from "datas/genreDatas";

type Props = {
  onChangeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue: string,
};

export const GenreSelect: VFC<Props> = memo((props) => {
  const {onChangeValue, defaultValue} = props
  return(
    <select className="mb-2 border-2 rounded-md" defaultValue={defaultValue} onChange={onChangeValue}>
      <option value="0">ジャンルを選択してください</option>
      {genreDatas.map((genre) => (<option key={genre.id} value={genre.id}>{genre.name}</option>))}
    </select>
  );
});