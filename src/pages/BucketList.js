// 리액트 패키지를 불러옵니다.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { deleteBucket, updateBucket } from "../redux/modules/bucket";
import Item from "../Item";

const BucketList = () => {
  const my_lists = useSelector((state) => state.bucket.list);

  const pointerStyle = {
    cursor: "pointer",
  };

  return (
    <BucketDiv>
      {my_lists.map(({ id, text, completed }, i) => {
        return <Item key={id} id={id} text={text} completed={completed} />;
      })}
    </BucketDiv>
  );
};

const BucketDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 70%;
`;

export default BucketList;
