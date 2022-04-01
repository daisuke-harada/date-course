import { client } from "lib/api/client";
import { memo, useEffect, VFC } from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";

const MainDiv = tw.div`bg-white mt-10 m-20 py-5 px-10 shadow-xl rounded-2xl`;
const TitleH1 = tw.h1`text-center mt-5 font-bold text-4xl pb-5`;

export const Show: VFC = memo(() => {
  const { id } = useParams();

  useEffect(() => {
    client.get(`courses/${id}`).then(response => {
      console.log(response.data.course);
    });
  }, [id]);

  return(
    <MainDiv>
      <TitleH1>デートコース詳細ページ</TitleH1>
      <div className="w-full mt-5">
      </div>
    </MainDiv>
  );
});