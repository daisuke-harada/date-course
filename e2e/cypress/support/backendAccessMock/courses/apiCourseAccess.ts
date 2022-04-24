import { CourseResponseData } from "../../types/courses/response";

export const apiCourseCreateAccess = (courseId: number) => {
  cy.intercept('POST', 'api/v1/courses', (req) => {
    req.reply({ status: 'created', courseId: courseId });
  });
};

export const apiCourseShowAccess = (courseData: CourseResponseData) => {
  cy.intercept('GET', `api/v1/courses/${courseData.id}`, (req) => {
    req.reply({course: courseData});
  });
};

export const apiCourseIndexAccess = (courseDatas: CourseResponseData[]) => {
  cy.intercept('GET', 'api/v1/courses', (req) => {
    req.reply({courses: courseDatas});
  });
};

export const apiCourseDestroyAccess = (courseId: number) => {
  cy.intercept('DELETE', `api/v1/courses/${courseId}`, (req) => {
    req.reply({status: 'deleted'});
  });
};