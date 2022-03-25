import { useRecoilState } from "recoil";
import { managementCourseState } from "store/managementCourse";
import { ManagementCourse } from "types/managementCourses/management";

export const useSearchManagementCourse = () => {
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState);
  const searchManagementCourse = (userId: number) => {
    const array = managementCourses.state.find((course: ManagementCourse) => course.userId === userId)
    if(array){
    }else {
      const addCourses = managementCourses.state.slice();
      addCourses.push({ userId: userId, courseDuringSpots: []});
      setManagementCourses({state: addCourses});
    }
    console.log(managementCourses.state);
  };

  return { searchManagementCourse };
};