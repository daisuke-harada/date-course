import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Top } from "components/pages/homes/Top";
import { Page404 } from "components/pages/Page404";
import { Login } from "components/pages/sessions/Login";
import { courseRoutes } from "router/CourseRoutes";
import { dateSpotReviewRoutes } from "router/DateSpotReviewRoutes";
import { dateSpotRoutes } from "router/DateSpotRoutes";
import { userRoutes } from "router/UserRoutes";
import { FlashMessage } from "components/atoms/message/FlashMessage";


export const Router: VFC = memo(() => {
  return(
    <>
      <FlashMessage />
      <Routes>
        <Route path="/" element={<Top />}  />
        <Route path="/login" element={<Login key={'Login認証のエラーの際に必要(のちに実装)'} />} />
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
    </>
  );
});