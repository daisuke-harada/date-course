import { client } from "lib/api/client";
import { memo, useEffect, VFC } from "react";
import { useParams } from "react-router-dom";

export const Show: VFC = memo(() => {
  const { id } = useParams();

  useEffect(() => {
    client.get(`courses/${id}`).then(response => {
      console.log(response.data.course);
    });
  }, [id]);

  return(
   <h1>デートコースの詳細ページです</h1>
  );
});