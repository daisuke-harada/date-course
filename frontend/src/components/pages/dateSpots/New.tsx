import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

const MainDiv = tw.div`max-w-xl mx-auto mt-10 bg-white p-5 border-gray-900`;
const Title = tw.h1`text-center text-lg m-5`;

export const New: VFC = memo(() => {
  return(
    <MainDiv>
      <Title>デートスポットの新規登録</Title>
    </MainDiv>
  );
});