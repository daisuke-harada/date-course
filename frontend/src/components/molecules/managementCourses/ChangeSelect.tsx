import { BaseButton } from "components/atoms/button/BaseButton";
import { memo, useCallback, useState, VFC } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { currentUserState } from "store/session";
import { ManagementCourse } from "types/managementCourses/management";

type Props = {
  currentDateSpotId: number,
  managementCourses: ManagementCourse,
  setManagementCourses: SetterOrUpdater<ManagementCourse>,
}

export const ChangeSelect: VFC<Props> = memo((props) => {
  const { currentDateSpotId, managementCourses, setManagementCourses } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [changeCourseId, setChangeCourseId] = useState(0);
  const onChangeCourseIdValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setChangeCourseId(Number(e.target.value)), []);

  const onClickCourseChange = useCallback(() => {
    const dateSpotIdAndName = (dateSpotId: number) => (managementCourses.courseDuringSpotIdAndNames.find(courseDuringSpotIdAndName => courseDuringSpotIdAndName.dateSpotId === dateSpotId));
    const dateSpotIndex = (dateSpot: {dateSpotId: number, dateSpotName: string}) => (managementCourses.courseDuringSpotIdAndNames.indexOf(dateSpot));
    const copyManagementCourses = managementCourses.courseDuringSpotIdAndNames.slice();
    const currentDateSpot = dateSpotIdAndName(currentDateSpotId) || {dateSpotId: 0, dateSpotName: ''};

    // セレクトボックスで何もデートスポットが選択されていない場合はcurrentDateSpotを代入する。
    const changeDateSpot = dateSpotIdAndName(changeCourseId) || currentDateSpot;

    // 入れ替え元と入れ替え先入れ替える
    copyManagementCourses.splice(
      dateSpotIndex(currentDateSpot),
      1,
      changeDateSpot
    );

    // 入れ替え先と入れ替え元を入れ替える
    copyManagementCourses.splice(
      dateSpotIndex(changeDateSpot),
      1,
      currentDateSpot
    );
    // 入れ替え完了した配列をセットする。
    setManagementCourses({userId: getCurrentUser.user.id, courseDuringSpotIdAndNames: copyManagementCourses});
  }, [
      getCurrentUser.user.id,
      changeCourseId, currentDateSpotId,
      managementCourses.courseDuringSpotIdAndNames,
      setManagementCourses
  ]);

  return(
      <>
        <select className="mb-2 border-2 rounded-md font-bold" onChange={onChangeCourseIdValue}>
          <option value="0">入れ替え対象を選択</option>
          {managementCourses.courseDuringSpotIdAndNames
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
          <BaseButton onClickEvent={onClickCourseChange}>順番を入れ替える</BaseButton>
        </div>
      </>
  );
});