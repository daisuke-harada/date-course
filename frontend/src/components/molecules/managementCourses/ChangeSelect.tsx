import { memo, VFC } from "react";

type Props = {
  courseDuringSpotIdAndNames: Array<{dateSpotId: number, dateSpotName: string}>,
  currentDateSpotId?: number
}

export const ChangeSelect: VFC<Props> = memo((props) => {
  const { courseDuringSpotIdAndNames, currentDateSpotId } = props
  return(
      <>
        <select className="mb-2 border-2 rounded-md font-bold">
          <option value="0">他のデートスポットと順番を入れ替える</option>
          {courseDuringSpotIdAndNames
            .filter(courseDuringSpotIdAndName => courseDuringSpotIdAndName.dateSpotId !== currentDateSpotId)
            .map((courseDuringSpotIdAndName) => {
            return(
              <option key={courseDuringSpotIdAndName.dateSpotId} value={courseDuringSpotIdAndName.dateSpotId.toString()} >
                {courseDuringSpotIdAndName.dateSpotName}
              </option>
            )
          })}
        </select>
      </>
  );
});