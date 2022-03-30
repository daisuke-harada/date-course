import { memo, VFC } from "react";
import { SetterOrUpdater } from "recoil";

type Props = {
  setTravelMode: SetterOrUpdater<{travelMode: string}>,
  dataE2e?: string,
  defaultValue: { travelMode: string; }
};

export const TravelModeSelect: VFC<Props> = memo((props) => {
  const { setTravelMode, dataE2e, defaultValue } = props;

  const onChangeTravelMode: React.ChangeEventHandler<HTMLSelectElement> = (e) => setTravelMode({travelMode: e.target.value});

  return(
    <div className='m-5 font-bold flex'>
      <div>
        交通手段を選択
      </div>
      <select data-e2e={dataE2e} className="mx-2 border-2 border-gray-400 rounded-md" defaultValue={defaultValue.travelMode} onChange={onChangeTravelMode}>
        <option value="DRIVING">車</option>
        <option value="WALKING">歩く</option>
        <option value="BICYCLING">自転車</option>
      </select>
    </div>
  );
});