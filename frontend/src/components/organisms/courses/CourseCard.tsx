import { DuringSpotCard } from "components/molecules/courses/DuringSpotCard";
import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { CourseResponseData } from "types/courses/response";

const MainDiv = tw.div`border bg-white rounded-xl w-11/12 m-5`;
const DuringSpotsDiv = tw.div`flex justify-evenly`;

type Props ={
  course: CourseResponseData
}

export const CourseCard: VFC<Props> = memo((props) =>{
  const { course } = props;
  console.log(course);

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
          <div className="bg-white rounded-xl shadow-xl p-2 my-2">
            <div className="bg-gray-400 w-48 h-48 rounded-xl border-4 border-pink-400 hover:border-pink-600">
              <div className="text-xs text-center font-bold pt-24">
                登録されていません
              </div>
            </div>
            <div className="text-xs text-center">
              <p className="my-2">
                デートスポット名
              </p>
              <p className="my-2">
                デートスポットの住所
              </p>
            </div>
          </div>
        }
        <div className="m-2 flex">
          <div className="w-1/6">
          </div>
        </div>
        <div className="text-center">
          {/* <%= link_to "デートコース詳細画面に行く", course_path(course.id), class:"btn btn-salmon m-5" %> */}
        </div>
      </DuringSpotsDiv>
    </MainDiv>
  );
});