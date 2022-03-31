import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../components/Item";

import { BucketDiv } from "../Styled";

const BucketList = () => {
  const my_lists = useSelector((state) => state.bucket.list);
  const [list, setList] = useState(my_lists);

  // 찾았다 방법
  useEffect(() => {
    setList(my_lists);
  }, [my_lists]);

  console.log(list);

  return (
    <BucketDiv>
      {list.map(({ id, text, completed }) => {
        return <Item key={id} id={id} text={text} completed={completed} />;
      })}
    </BucketDiv>
  );
};
export default BucketList;
