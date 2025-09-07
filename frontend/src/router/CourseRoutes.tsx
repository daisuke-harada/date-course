import { Index } from 'components/pages/courses/Index';
import { Page404 } from 'components/pages/Page404';
import { Show } from 'components/pages/courses/Show';

export const CourseRoutes = () => {

  return [
    {
      path: 'index',
      element: <Index />,
    },
    {
      path: ':id',
      element: <Show />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};
