import { BaseButton } from "components/atoms/button/BaseButton";
import { UserImage } from "components/atoms/layouts/users/UserImage";
import { FollowingsAndFollowersLinkArea } from "components/atoms/Link/FollowingsAndFollowersLinkArea";
import { DuringSpotCard } from "components/molecules/courses/DuringSpotCard";
import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { CourseResponseData } from "types/courses/response";

const MainDiv = tw.div`border bg-white rounded-xl m-5`;
const DuringSpotsDiv = tw.div`flex justify-evenly`;
const MainDl = tw.dl`text-left my-5`
const DD = tw.dd`m-2 font-bold text-base`;

type Props ={
  course: CourseResponseData
}

export const CourseCard: VFC<Props> = memo((props) =>{
  const { course } = props;

  return(
    <MainDiv>
      <DuringSpotsDiv>
        {
          course.courseDuringSpots.map(
            (courseDuringSpot, index) => (
              index <= 2
              &&
                <DuringSpotCard key={index} duringSpot={courseDuringSpot} />
            )
          )
        }
        {
          course.courseDuringSpots.length < 3
          &&
          <div className="bg-white rounded-xl shadow-xl p-2 m-2 w-36">
            <div className="bg-gray-400 w-32 h-32 rounded-xl border-4 border-pink-400 hover:border-pink-600">
              <div className="text-xs text-center font-bold pt-16">
                登録されていません
              </div>
            </div>
            <div className="text-xs text-center">
              <p className="my-2">
                デートスポット名
              </p>
            </div>
          </div>
        }
      </DuringSpotsDiv>
      <div className="ml-12 my-6 flex">
        <UserImage
          addClassName="w-24 h-24"
          image={course.user.image}
          userId={course.user.id}
          gender={course.user.gender}
        />
        <MainDl>
          <DD className='pl-2'>
            {course.user.name}さんの投稿
          </DD>
          <DD>
            <FollowingsAndFollowersLinkArea
              userId={course.user.id}
              followerIdsCount={course.user.followerIds.length}
              followingIdsCount={course.user.followingIds.length}
            />
          </DD>
        </MainDl>
      </div>
      <div className="text-center my-5 font-bold m-auto w-1/2">
        <Link to={`/courses/${course.id}`}>
          <BaseButton>
            コースの詳細ページへ行く
          </BaseButton>
        </Link>
      </div>
    </MainDiv>
  );
});