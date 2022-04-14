import { memo, useEffect, useState, VFC } from 'react';
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

const ImageParentDiv = tw.div`relative pt-20`;
const Image = tw.img`lg:bg-top object-fill absolute top-0 w-full h-full rounded-xl border-4`;


export const UserImage: VFC<Props> = memo((props) => {
  const { addClassName, image, userId, gender } = props;
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [userImage, setUserImage] = useState(noImageUrl);
  const [genderBorderColor, setGenderBorderColor] = useState('');

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