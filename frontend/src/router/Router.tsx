import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Top } from "../components/pages/homes/Top";
export const Router: VFC = memo(() => {
  return(
    <Routes>
      <Route path="/">
        <Top/>
      </Route>
    </Routes>
  )
});