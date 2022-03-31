import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBucket, loadBucketFB } from "../redux/modules/bucket";

const Search = () => {
  const list = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const filterText = filter ? "전체 보기" : "해야할 것만 보기";

  useEffect(() => {
    if (filter) dispatch(filterBucket(list));
    else dispatch(loadBucketFB(list));
  }, [filter]);

  console.log(list);

  return (
    <>
      <input type="text" />
      <button
        style={{ position: "absolute", top: "20px" }}
        onClick={() => {
          setFilter(!filter);
        }}
      >
        {filterText}
      </button>
    </>
  );
};

export default Search;
