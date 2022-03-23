import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";
import tw from "tailwind-styled-components";

const ImageParentDiv = tw.div`relative h-96`;
const Image = tw.img`object-cover object-top absolute w-full h-full`;

export const Top: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  // const developBackendUrlClass = `bg-[${process.env.PUBLIC_URL}/lp.jpg] h-96 bg-no-repeat bg-cover bg-top`;
  // const productionBackendUrlClass = "bg-[url(https://backend.datecourses.com/images/lp.jpg)] h-96 bg-no-repeat bg-cover bg-top";
  // const backendLpUrlClass = process.env.REACT_APP_ENVIRONMENT === 'production'? productionBackendUrlClass : developBackendUrlClass;

  return(
    <>
      {/* <div className={backendLpUrlClass}> */}
       {/* ここに案内ボタンを設置 */}
       {/* <h1>Topページ</h1> */}
      {/* </div> */}
      {/* <img src={`${process.env.PUBLIC_URL}/lp.jpg`} /> */}
      <ImageParentDiv>
        <Image src={`${process.env.PUBLIC_URL}/lp.jpg`} />
        <h1 className='p-5 dtext-3xl font-bold z-10 bottom-10 absolute'>Topページ</h1>
      </ImageParentDiv>
      {getLoginStatus.status && (<h1>ログイン状態です</h1>)}
    </>
  );
});