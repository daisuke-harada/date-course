import { BaseButton } from "components/atoms/button/BaseButton";
import { memo, useCallback, useState, VFC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";

type Props = {
  courseDuringSpotIdAndNames: Array<{dateSpotId: number, dateSpotName: string}>,
  currentDateSpotId: number
}

export const ChangeSelect: VFC<Props> = memo((props) => {
  const { courseDuringSpotIdAndNames, currentDateSpotId } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const [changeCourseId, setChangeCourseId] = useState(0);

  const onChangeCourseIdValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setChangeCourseId(Number(e.target.value)), []);
  const dateSpotIdAndName = (dateSpotId: number) => {
    return (
      managementCourses.courseDuringSpotIdAndNames.find(courseDuringSpotIdAndName => courseDuringSpotIdAndName.dateSpotId === dateSpotId)

    )
  };
  console.log(dateSpotIdAndName(currentDateSpotId));
  console.log(dateSpotIdAndName(changeCourseId));
  console.log(managementCourses.courseDuringSpotIdAndNames.indexOf(dateSpotIdAndName(currentDateSpotId)));

  const onClickCourseChange = () => {
   
  };

  return(
      <>
        <select className="mb-2 border-2 rounded-md font-bold" onChange={onChangeCourseIdValue}>
          <option value="0">入れ替え対象を選択</option>
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
        <div className='my-5 mx-12'>
          <BaseButton>順番を入れ替える</BaseButton>
        </div>
      </>
  );
});