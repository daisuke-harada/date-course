import { memo, useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

type Props = {
  addClassName: string,
  image: {
    url: string | null
  },
  userId: number,
  gender: string,
};

const ImageParentDiv = tw.div`relative hover:scale-105 duration-75`;
const Image = tw.img`lg:bg-top object-cover absolute top-0 w-full h-full rounded-xl border-4`;

export const UserImage: FC<Props> = memo((props) => {
  const { addClassName, image, userId, gender } = props;
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [userImage, setUserImage] = useState(noImageUrl);
  const [genderBorderColor, setGenderBorderColor] = useState('');

  // 性別が女性の場合と男性の場合で写真の枠の色を変更する。
  useEffect(() => {
    image && image.url !== null && setUserImage(image.url);
    if(gender === '女性'){
      setGenderBorderColor('border-red-400 hover:border-red-500');
    }else if(gender === '男性'){
      setGenderBorderColor('border-blue-400 hover:border-blue-500');
    };
  }, [image, gender]);

  return(
    <Link to={`/users/${userId}`}>
      <ImageParentDiv className={addClassName}>
        <Image className={genderBorderColor} src={userImage} alt='UserProfileImage'/>
      </ImageParentDiv>
    </Link>
  );
});