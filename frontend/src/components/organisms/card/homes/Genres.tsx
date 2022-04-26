import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { GenreData } from 'types/homes/data';

const MainDiv = tw.div`m-4 p-4 w-9/12 flex flex-wrap lg:justify-start justify-center`;

type Props ={
  genres: GenreData[]
}

export const Genres: VFC<Props> = memo((props) => {

  const { genres } = props;

  return(
    <MainDiv>
      {
        genres.map((genre) => (
          <div key={genre.attributes.id} className='font-bold w-36 m-2'>
            <Link to={`/genres/${genre.attributes.id}`}>
              {genre.attributes.name}
            </Link>
          </div>
        ))
      }
    </MainDiv>
  );
});