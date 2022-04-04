import { memo, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { GenreData } from 'types/homes/data';

const MainDiv = tw.div`m-3 p-3 bg-white w-9/12`;

type Props ={
  genres: GenreData[]
}

export const Genres: VFC<Props> = memo((props) => {

  const { genres } = props;

  return(
    <MainDiv>
      {
       genres.map((genre) => (
         <div className='font-bold my-2'>{genre.attributes.name}</div>
       ))
      }
    </MainDiv>
  );
});