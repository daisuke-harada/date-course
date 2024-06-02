import { memo, FC } from 'react';

type Props = {
  selectImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const ImageForm: FC<Props> = memo((props) => {
  const { selectImage } = props;
  return(
    <div className='my-3 mobile(M):ml-0 ml-8'>
      <input className='my-3' type='file' onChange={(e)=> selectImage(e)} />
    </div>
  );
});