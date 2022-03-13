import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";

const Div = tw.div`w-full flex`
const ImageParentDiv = tw.div` h-40 w-40 relative`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-2xl`;
const Input = tw.input`my-5 border-b-2 outline-none w-1/2 mobile(M):w-full mobile(M):ml-0 ml-8`;

type Props = {
  dateSpotId: number
};

export const DateSpotReviewArea: VFC<Props> = memo((props) => {
  const { dateSpotId } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [content, setContent] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('http://localhost:7777/images/no_image.jpg');
  const onChangeContent: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => setContent(e.target.value), []);
  useEffect(() => {
    getCurrentUser.user.image.url !== null && setUserImage(getCurrentUser.user.image.url);
  }, [getCurrentUser]);

  return(
    <Div>
      <ImageParentDiv>
        <Image src={userImage} alt='UserProfileImage' />
      </ImageParentDiv>
      {/* 星による評価 */}
      <div className="m-5">
        <Input placeholder='コメントを入力' value={content} onChange={onChangeContent} />
      </div>
    </Div>
  );
});