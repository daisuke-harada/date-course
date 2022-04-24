import { VFC, memo } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { PrefectureData } from 'types/homes/data';

type Props = {
  prefecture: PrefectureData
}

const ImageParentDiv = tw.div`relative w-1/2`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-l-xl`;

export const MainPrefecture: VFC<Props> = memo((props) => {

  const { prefecture } = props

  return(

    <Link className='md:w-3/12 md:h-60 bg-white m-3 h-20 border w-1/3 flex rounded-xl shadow-xl hover:scale-105 duration-300' to={`prefectures/${prefecture.attributes.id}`}>
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/prefectureImages/${prefecture.attributes.name}.jpg`} />
      </ImageParentDiv>
      <div className='md:text-left text-center w-1/2'>
        <div className='md:text-xl sm:p-1 text-xs text-black font-bold' >
          {/* <Link to={`prefectures/${prefecture.attributes.id}`}> */}
            {prefecture.attributes.name}
          {/* </Link> */}
        </div>
      </div>
    </Link>
  );
});