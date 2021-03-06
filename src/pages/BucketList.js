import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../components/Item";

import { BucketDiv } from "../Styled";

const BucketList = () => {
  const my_lists = useSelector((state) => state.bucket.list);
  const [list, setList] = useState(my_lists);
  const [query, setQuery] = useState("");

  // 찾았다 방법
  useEffect(() => {
    setList(my_lists);
  }, [my_lists]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchList = list
    .filter((bucket) => {
      const title = bucket.text;
      const q = query;

      return title.includes(q);
    })
    .map(({ id, text, completed }) => {
      return <Item key={id} id={id} text={text} completed={completed} />;
    });

  return (
    <BucketDiv>
      {searchList.length
        ? searchList
        : list.map(({ id, text, completed }) => {
            return <Item key={id} id={id} text={text} completed={completed} />;
          })}

      <input type="text" value={query} onChange={handleChange} />
    </BucketDiv>
  );
};
export default BucketList;
