import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { AreaData } from 'types/homes/data';
import { prefectureDatas } from 'datas/prefectureDatas';

type Props = {
  area: AreaData
}

const MainDiv = tw.div`md:w-3/12 m-4 p-4 w-1/3 bg-white rounded-xl shadow-xl`;

export const Area: FC<Props> = memo((props) => {

  const { area } = props;

  return(
    <MainDiv>
      <h1 className='m-2 font-bold'>{area.attributes.name}</h1>
      {
        prefectureDatas.map((prefectureData) => (
          prefectureData.areaId === area.attributes.id
          &&
          <div key={prefectureData.id} className='inline-block m-1'>
            <Link to={`/prefectures/${prefectureData.id}`}>
              {prefectureData.name}
            </Link>
          </div>
        ))
      }
    </MainDiv>
  );
});