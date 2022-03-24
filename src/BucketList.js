// 리액트 패키지를 불러옵니다.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { deleteBucket, updateBucket } from "./redux/modules/bucket";
import Item from "./Item";

const BucketList = () => {
  const navigate = useNavigate();
  const my_lists = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();

  const pointerStyle = {
    cursor: "pointer",
  };
  const testStyle = {
    padding: "0 100px 0 0",
  };

  const handleCancel = () => {};

  const handleConfirm = (index, type) => {
    console.log(type);
    switch (type) {
      case "check":
        dispatch(updateBucket(index));
        break;
      case "remove":
        dispatch(deleteBucket(index));
        break;
      default:
        return;
    }
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
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 50vh;
`;

export default BucketList;
