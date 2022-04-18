import { BaseButton } from 'components/atoms/button/BaseButton';
import { Area } from 'components/organisms/card/homes/Area';
import { Genres } from 'components/organisms/card/homes/Genres';
import { MainGenre } from 'components/organisms/card/homes/MainGenre';
import { MainPrefecture } from 'components/organisms/card/homes/MainPrefecture';
import { DateSpotRanking } from 'components/organisms/rankings/DateSpotRanking';
import { defaultAddfressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { AreaData, GenreData, PrefectureData } from 'types/homes/data';
import { Loading } from 'components/pages/Loading';

const ImageParentDiv = tw.div`relative h-96`;
const Image = tw.img`object-cover object-top absolute w-full h-full`;

export const Top: VFC = memo(() => {
  const [ areas, setAreas ] = useState<AreaData[]>([]);
  const [ mainGenres, setMainGenres ] = useState<GenreData[]>([]);
  const [ genres, setGenres ] = useState<GenreData[]>([]);
  const [ mainPrefectures, setMainPrefectures ] = useState<PrefectureData[]>([]);
  const [addressAndDateSpots, setAddressAndDateSpots] = useState<AddressAndDateSpotJoinData[]>([defaultAddfressAndDateSpotJoinData]);


  useEffect(() => {
    client.get('top').then((response) => {
      setAreas(response.data.areas);
      setGenres(response.data.genres);
      setMainGenres(response.data.mainGenres);
      setMainPrefectures(response.data.mainPrefectures);
      setAddressAndDateSpots(response.data.addressAndDateSpots);
    });
  }, []);

  return(
    <Loading loadingSwitch={addressAndDateSpots.length !== 0 && addressAndDateSpots[0].id === 0 && true}>
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
      <div className='w-10/12 m-auto'>
        <DateSpotRanking addressAndDateSpots={addressAndDateSpots} />
      </div>
    </Loading>
  );
});