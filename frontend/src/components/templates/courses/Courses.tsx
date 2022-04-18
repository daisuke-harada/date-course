import { memo, VFC } from 'react';

import { CourseResponseData } from 'types/courses/response';
import { CourseCard } from 'components/organisms/card/courses/CourseCard';
import { prefectureDatas } from 'datas/prefectureDatas';
import { Loading } from 'components/pages/Loading';

type Props = {
  courses: Array<CourseResponseData>,
  searchPrefectureId?: number
};

export const Courses: VFC<Props> = memo((props) => {
  const { courses, searchPrefectureId } = props;

  return(
    // coursesの初期値のidを0にしているため、初期値が読み込まれている間はLoading画面を表示させる。
    // そうすることで画面のちらつきを解消する
    <Loading loadingSwitch={courses.length !== 0 && courses[0].id === 0 && true}>
      {
        courses.length !== 0?
        (
          <>
            {
              searchPrefectureId &&
              <div className='text-xl px-2 mb-10 font-bold text-center'>
                {
                  `${prefectureDatas.find((prefecture) => prefecture.id === searchPrefectureId)?.name}を含むデートコース`
                }
              </div>
            }
            <div className='sm:justify-start justify-center flex flex-wrap px-2'>
              {courses.map((course, index) => (<CourseCard key={index} course={course} />))}
            </div>
          </>
        )
        :
        (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            デートコースは存在しません
          </div>
        )
      }
    </Loading>
  );
});