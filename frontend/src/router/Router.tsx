import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Top } from "../components/pages/homes/Top";
import { dateSpotRoutes } from "./DateSpotRoutes";
import { userRoutes } from "./UserRoutes";
export const Router: VFC = memo(() => {
  return(
    <Routes>
      <Route path="/" element={<Top/>} />
      <Route path="users" >
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="dateSpots" >
        {dateSpotRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
});