import { memo, VFC } from 'react';

import { genreDatas } from 'datas/genreDatas';

type Props = {
  onChangeValue: React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue: string,
  dataE2e?: string,
  addClassName?: string
};

export const GenreSelect: VFC<Props> = memo((props) => {
  const {onChangeValue, defaultValue, dataE2e, addClassName} = props
  return(
    <select data-e2e={dataE2e} className={`mb-2 lg:text-lg text-xs border-2 rounded-md ${addClassName}`} defaultValue={defaultValue} onChange={onChangeValue}>
      <option value=''>ジャンル</option>
      {genreDatas.map((genre) => (<option key={genre.id} value={genre.id}>{genre.name}</option>))}
    </select>
  );
});