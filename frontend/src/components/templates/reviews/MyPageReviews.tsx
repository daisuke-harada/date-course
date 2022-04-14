import { memo, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { ReviewCard } from 'components/organisms/card/reviews/ReviewCard';
import { DateSpotReviewAndDateSpotResponseData } from 'types/dateSpotReviews/response';
import { Link } from 'react-router-dom';

const ImageParentDiv = tw.div`sm:w-32 sm:h-32 w-20 h-20 relative pt-20`;
const Image = tw.img`lg:bg-top object-fill absolute top-0 w-full h-full rounded-xl border-4 border-pink-400 hover:border-pink-600`;



type Props = {
  reviews: DateSpotReviewAndDateSpotResponseData[]
};

export const MyPageReviews: VFC<Props> = memo((props) => {
  const { reviews } = props;
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;

  return(
    <>
      <>
      {
        reviews.length !== 0?
        (
          // <div className='sm:justify-start justify-center flex flex-wrap px-2'>
          <div className='w-full my-2 overflow-y-scroll h-96 border-2 border-red-300 rounded-xl p-1'>
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                rate={review.rate}
                content={review.content}
                name={review.dateSpot.name}
                ImageDiv={
                  <ImageParentDiv>
                    <Link to={`/dateSpots/${review.dateSpot.id}`}>
                      <Image src={(review.dateSpot.image && review.dateSpot.image.url) || noImageUrl} />
                    </Link>
                  </ImageParentDiv>
                }
              />
            ))}
          </div>
        )
        :
        (
          <div className='my-5 text-center text-red-400 text-xl'>
            レビューは存在しません
          </div>
        )
      }
    </>
    </>
  );
});