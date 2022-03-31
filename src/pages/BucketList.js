import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../components/Item";

import { BucketDiv } from "../Styled";

const BucketList = () => {
  const my_lists = useSelector((state) => state.bucket.list);
  const [list, setList] = useState(my_lists);

  // 어떻게하면 비동기로 연동된 데이터를 state로 넣을수 있는지
  // useEffect(async () => {
  //   await setList(my_lists);
  // }, [list]);

  return (
    <BucketDiv>
      {my_lists.map(({ id, text, completed }) => {
        return <Item key={id} id={id} text={text} completed={completed} />;
      })}
    </BucketDiv>
  );
};
export default BucketList;
