import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Top } from "components/pages/homes/Top";
import { Page404 } from "components/pages/Page404";
import { Login } from "components/pages/sessions/Login";
import { CourseRoutes } from "router/CourseRoutes";
import { DateSpotReviewRoutes } from "router/DateSpotReviewRoutes";
import { DateSpotRoutes } from "router/DateSpotRoutes";
import { UserRoutes } from "router/UserRoutes";
import { FlashMessage } from "components/atoms/message/FlashMessage";


export const Router: VFC = memo(() => {
  return(
    <>
      <FlashMessage />
      <Routes>
        <Route path="/" element={<Top />}  />
        <Route path="/login" element={<Login />} />
        <Route path="users" >
          {UserRoutes().map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="courses" >
          {CourseRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="dateSpots" >
          {DateSpotRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="dateSpotReviews" >
          {DateSpotReviewRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  );
});