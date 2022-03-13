import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { UserResponseData } from 'types/users/response';

type Props = {
  addClassName: string,
  user: UserResponseData,
};

const ImageParentDiv = tw.div`relative pt-20`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-xl border-4`;


export const UserImage: VFC<Props> = memo((props) => {
  const { addClassName, user } = props;
  const [userImage, setUserImage] = useState('http://localhost:7777/images/no_image.jpg');
  const [genderBorderColor, setGenderBorderColor] = useState('');

  useEffect(() => {
    user.image && user.image.url !== null && setUserImage(user.image.url);
    if(user.gender === '女'){
      setGenderBorderColor('border-red-400 hover:border-red-500');
    }else if(user.gender === '男'){
      setGenderBorderColor('border-blue-400 hover:border-blue-500');
    };
  }, [user]);

  return(
    <ImageParentDiv className={addClassName}>
      <Image className={genderBorderColor} src={userImage} alt='UserProfileImage'/>
    </ImageParentDiv>
  );
});