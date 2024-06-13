import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCurrentDateCourseState } from 'defaults/dateCourseDefaults';
import { CourseInfoData, ManagementCourseData } from 'types/managementCourses/management';

const currentDateCourseSlice = createSlice({
  name: 'dateCourse',
  initialState: initialCurrentDateCourseState,
  reducers: {
    setManagementCourse(state, action: PayloadAction<ManagementCourseData>) {
      state.managementCourse = action.payload;
    },
    setCourseInfo(state, action: PayloadAction<CourseInfoData>) {
      state.courseInfo = action.payload;
    }
  }
});

export const { setManagementCourse, setCourseInfo } = currentDateCourseSlice.actions;
export default currentDateCourseSlice.reducer;
