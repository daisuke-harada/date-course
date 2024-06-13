import { memo, useCallback, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { ManagementCourseData } from 'types/managementCourses/management';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { setManagementCourse } from 'reducers/currentDateCourseSlice';


type Props = {
  currentDateSpotId: number,
  managementCourse: ManagementCourseData,
}

export const ChangeSelect: FC<Props> = memo((props) => {
  const { currentDateSpotId, managementCourse} = props;
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const [changeCourseId, setChangeCourseId] = useState(0);
  const onChangeCourseIdValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setChangeCourseId(Number(e.target.value)), []);

  const onClickCourseChange = useCallback(() => {
    const dateSpotIdAndName = (dateSpotId: number) => (managementCourse.dateSpots.find(courseDuringSpot => courseDuringSpot.dateSpot.id === dateSpotId));
    const dateSpotIndex = (addressAndDateSpot: AddressAndDateSpotJoinData) => (managementCourse.dateSpots.indexOf(addressAndDateSpot));
    const copymanagementCourse = managementCourse.dateSpots.slice();
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
    copymanagementCourse.splice(
      dateSpotIndex(currentDateSpot),
      1,
      changeDateSpot
    );

    // 入れ替え先と入れ替え元を入れ替える
    copymanagementCourse.splice(
      dateSpotIndex(changeDateSpot),
      1,
      currentDateSpot
    );
    // 入れ替え完了した配列をセットする。
    dispatch(setManagementCourse({userId: currentUser.id, dateSpots: copymanagementCourse}));
  }, [
      currentUser.id,
      changeCourseId, currentDateSpotId,
      managementCourse.dateSpots,
      dispatch
    ]
  );

  return(
      <>
        <select data-e2e={`spot-change-select-${currentDateSpotId}`} className='mb-2 border-2 rounded-md font-bold' onChange={onChangeCourseIdValue}>
          <option value='0'>入れ替え対象を選択</option>
          {managementCourse.dateSpots
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