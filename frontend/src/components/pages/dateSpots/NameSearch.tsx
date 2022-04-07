import { Users } from "components/templates/users/Users";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { UserResponseData } from "types/users/response";

export const NameSearch: VFC = memo(() => {


  return(
    <>
      <h1 className='m-4'>ユーザーを探すページ</h1>
    </>
  );
});