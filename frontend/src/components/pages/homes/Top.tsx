import { BaseButton } from 'components/atoms/button/BaseButton';
import { Area } from 'components/organisms/homes/Area';
import { Genres } from 'components/organisms/homes/Genres';
import { MainGenre } from 'components/organisms/homes/MainGenre';
import { MainPrefecture } from 'components/organisms/homes/MainPrefecture';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { AreaData, GenreData, PrefectureData } from 'types/homes/data';

const ImageParentDiv = tw.div`relative h-96`;
const Image = tw.img`object-cover object-top absolute w-full h-full`;

export const Top: VFC = memo(() => {
  const [ areas, setAreas ] = useState<AreaData[]>([]);
  const [ mainGenres, setMainGenres ] = useState<GenreData[]>([]);
  const [ genres, setGenres ] = useState<GenreData[]>([]);
  const [ mainPrefectures, setMainPrefectures ] = useState<PrefectureData[]>([]);

  useEffect(() => {
    client.get('top').then((response) => {
      setAreas(response.data.areas);
      setGenres(response.data.genres);
      setMainGenres(response.data.mainGenres);
      setMainPrefectures(response.data.mainPrefectures);
    });
  }, []);

  return(
    <>
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/lp.jpg`} />
        <h1 className='m-5 dtext-3xl font-bold z-10 bottom-0 absolute'>
          <BaseButton>デートコースを作成する</BaseButton>
        </h1>
      </ImageParentDiv>
      <div className='mb-1'>
        <p className='md:text-3xl font-bold text-xl pt-10 text-center'>デートスポットをエリアから探す</p>
        <div className='flex justify-center flex-wrap w-full p-5'>
          {
            mainPrefectures.map((mainPrefecture) => (
              <MainPrefecture key={mainPrefecture.attributes.id} prefecture={mainPrefecture} />
            ))
          }
          {
            areas.map((area) => (
              <Area key={area.attributes.id} area={area} />
            ))
          }
        </div>
      </div>
      <div className='mb-1'>
        <p className='md:text-3xl font-bold text-xl pt-10 text-center'>デートスポットをジャンルで探す</p>
        <div className='flex'>
          <div className='flex justify-center flex-wrap w-full p-5'>
            {
              mainGenres.map((genre) => (
                <MainGenre key={genre.attributes.id} genre={genre} />
              ))
            }
            <Genres genres={genres} />
          </div>
        </div>
      </div>
    </>
  );
});