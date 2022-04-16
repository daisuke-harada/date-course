import { VFC, memo } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { GenreData } from 'types/homes/data';

type Props = {
  genre: GenreData
}

const ImageParentDiv = tw.div`relative w-6/12`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-xl`;

export const MainGenre: VFC<Props> = memo((props) => {

  const { genre } = props;

  return(
    <div className='md:w-3/12 md:h-60 bg-white rounded-xl shadow-lg m-3 h-20 border w-1/3 flex' >
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/genreImages/${genre.attributes.name}.jpg`} />
      </ImageParentDiv>
      <div className='md:text-left text-center w-6/12'>
        {/* <%= link_to genre.name, {:controller=>'date_spots',:action=>'index',:date_spot_search=>{:genre_id_eq=>'#{genre.id}'}}, as: :date_spot_search, className:'md:text-xl sm:p-1 text-xs text-black font-bold' %> */}
        <div className='md:text-xl sm:p-1 text-xs text-black font-bold'>
          <Link to={`/genres/${genre.attributes.id}`}>
            {genre.attributes.name}
          </Link>
        </div>
      </div>
    </div>
  );
});