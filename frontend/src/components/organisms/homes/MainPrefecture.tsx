import { VFC, memo } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { PrefectureData } from "types/homes/data";

type Props = {
  prefecture: PrefectureData
}

const ImageParentDiv = tw.div`relative w-6/12`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-xl`;
const MainDiv = tw.div`md:w-3/12 md:h-60 bg-white m-3 h-20 border w-1/3 flex rounded-xl shadow-xl`;


export const MainPrefecture: VFC<Props> = memo((props) => {

  const { prefecture } = props

  return(
    <MainDiv>
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/prefectureImages/${prefecture.attributes.name}.jpg`} />
      </ImageParentDiv>
      <div className="md:text-left text-center w-6/12">
        <div className="md:text-xl sm:p-1 text-xs text-black font-bold" >
          <Link to={`prefectures/${prefecture.attributes.id}`}>
            {prefecture.attributes.name}
          </Link>
        </div>
      </div>
    </MainDiv>
  );
});