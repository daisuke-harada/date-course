import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

// import { useEffect } from "react";

import { Top } from "components/pages/homes/Top";
import { Page404 } from "components/pages/Page404";
import { Login } from "components/pages/sessions/Login";
import { courseRoutes } from "router/CourseRoutes";
import { dateSpotReviewRoutes } from "router/DateSpotReviewRoutes";
import { dateSpotRoutes } from "router/DateSpotRoutes";
import { userRoutes } from "router/UserRoutes";

export const Router: VFC = memo(() => {
  // useEffect(()=> {
  //   console.log(cookies.loginStatus);
  //   setloginStatusStatus({status: loginStatus});
  //   // console.log(getloginStatusStatus);
  // });

  return(
    <Routes>
      <Route path="/" element={<Top />}  />
      <Route path="/login" element={<Login />} />
      <Route path="users" >
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="courses" >
        {courseRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="dateSpots" >
        {dateSpotRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="dateSpotReviews" >
        {dateSpotReviewRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
});