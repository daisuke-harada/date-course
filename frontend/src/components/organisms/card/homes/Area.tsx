import { prefectureDatas } from 'datas/prefectureDatas';
import { VFC, memo } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { AreaData } from 'types/homes/data';

type Props = {
  area: AreaData
}

const MainDiv = tw.div`md:w-3/12 m-3 p-3 w-1/3 bg-white rounded-xl shadow-xl`;

export const Area: VFC<Props> = memo((props) => {

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