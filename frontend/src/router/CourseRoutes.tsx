import { Index } from 'components/pages/courses/Index';
import { Search } from 'components/pages/courses/Search';
import { Show } from 'components/pages/courses/Show';
import { Page404 } from 'components/pages/Page404';

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
      path: 'search',
      element: <Search />
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};
