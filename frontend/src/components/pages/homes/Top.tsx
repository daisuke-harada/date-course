import { BaseButton } from "components/atoms/button/BaseButton";
import { Area } from "components/organisms/homes/Area";
import { Genre } from "components/organisms/homes/Genre";
import { MainPrefecture } from "components/organisms/homes/MainPrefecture";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import tw from "tailwind-styled-components";
import { AreaData, GenreData, PrefectureData } from "types/homes/data";

const ImageParentDiv = tw.div`relative h-96`;
const Image = tw.img`object-cover object-top absolute w-full h-full`;

export const Top: VFC = memo(() => {
  const [ areas, setAreas ] = useState<AreaData[]>([]);
  const [ mainGenres, setMainGenres ] = useState<GenreData[]>([]);
  const [ mainPrefectures, setMainPrefectures ] = useState<PrefectureData[]>([]);

  useEffect(() => {
    client.get('top').then((response) => {
      setAreas(response.data.areas);
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
      <div className="bg-white mb-1">
        <p className="md:text-3xl text-xl pt-10 text-center">デートスポットをエリアから探す</p>
        <div className="flex justify-center flex-wrap w-full p-5">
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
      <div className="bg-white">
        <p className="md:text-3xl text-xl pt-10 text-center">デートスポットをジャンルで探す</p>
        <div className="flex">
          <div className="flex justify-center flex-wrap w-full p-5">
            {/* <% @main_genres.each do |genre| %>
              <%= render "genres/genre", genre: genre %>
            <% end %> */}
            {
              mainGenres.map((genre) => (
                <Genre key={genre.attributes.id} genre={genre} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
});