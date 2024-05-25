import { memo, useCallback, useState, VFC } from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

import { currentUserState } from 'store/session';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { ManagementCourseData } from 'types/managementCourses/management';
import { BaseButton } from 'components/atoms/button/BaseButton';

type Props = {
  currentDateSpotId: number,
  managementCourses: ManagementCourseData,
  setManagementCourses: SetterOrUpdater<ManagementCourseData>,
}

export const ChangeSelect: VFC<Props> = memo((props) => {
  const { currentDateSpotId, managementCourses, setManagementCourses } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [changeCourseId, setChangeCourseId] = useState(0);
  const onChangeCourseIdValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setChangeCourseId(Number(e.target.value)), []);

  const onClickCourseChange = useCallback(() => {
    const dateSpotIdAndName = (dateSpotId: number) => (managementCourses.dateSpots.find(courseDuringSpot => courseDuringSpot.dateSpot.id === dateSpotId));
    const dateSpotIndex = (addressAndDateSpot: AddressAndDateSpotJoinData) => (managementCourses.dateSpots.indexOf(addressAndDateSpot));
    const copyManagementCourses = managementCourses.dateSpots.slice();
    const currentDateSpot = dateSpotIdAndName(currentDateSpotId) || {
      id: 0,
      cityName: '',
      prefectureName: '',
      dateSpot: {
        id: 0,
        name: '',
        genreId: 0,
        image: {
          url: null
        },
        openingTime: new Date('2022/11/02'),
        closingTime: new Date('2022/11/02'),
        createdAt: new Date('2022/11/02'),
        updatedAt: new Date('2022/11/02'),
      },
      genreName: '',
      latitude: 0,
      longitude: 0,
      reviewTotalNumber: 0,
      averageRate: 0,
    };

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
    setManagementCourses({userId: getCurrentUser.user.id, dateSpots: copyManagementCourses});
  }, [
      getCurrentUser.user.id,
      changeCourseId, currentDateSpotId,
      managementCourses.dateSpots,
      setManagementCourses
    ]
  );

  return(
      <>
        <select data-e2e={`spot-change-select-${currentDateSpotId}`} className='mb-2 border-2 rounded-md font-bold' onChange={onChangeCourseIdValue}>
          <option value='0'>入れ替え対象を選択</option>
          {managementCourses.dateSpots
            .filter(courseDuringSpot => courseDuringSpot.dateSpot.id !== currentDateSpotId)
            .map((courseDuringSpot) => {
            return(
              <option key={courseDuringSpot.dateSpot.id} value={courseDuringSpot.dateSpot.id.toString()} >
                {courseDuringSpot.dateSpot.name}
              </option>
            )
          })}
        </select>
        <div data-e2e={`spot-change-button-${currentDateSpotId}`} className='my-5 m-auto text-sm'>
          <BaseButton onClickEvent={onClickCourseChange}>順番を入れ替える</BaseButton>
        </div>
      </>
  );
});