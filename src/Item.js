import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { CheckboxOutline } from "react-ionicons";
import { TrashOutline } from "react-ionicons";
import { CheckmarkOutline } from "react-ionicons";
import { CloseOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";

const Item = (props) => {
  const { id, text, completed } = props;
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(completed);
  const [isProcessing, setIsProcessing] = useState(null);

  const dispatch = useDispatch();

  // css속성
  const pointerStyle = {
    cursor: "pointer",
  };

  // 버킷 배경색 리턴
  const bucketColor = (isDone, isProcessing) => {
    if (isProcessing)
      return isProcessing !== "삭제할까요?" ? "#ff5e57ba" : "#ff57228f";
    else return isDone ? "#a673ff" : "aliceblue";
  };

  const handleCancel = () => {
    setIsProcessing(null);
  };

  const handleConfirm = () => {
    if (isProcessing === "삭제할까요?") dispatch(deleteBucket(id));
    else dispatch(updateBucket(id));
    setIsProcessing(null);
    setIsDone(true);
  };

  return (
    <ItemStyle
      textColor={completed}
      bgColor={() => bucketColor(isDone, isProcessing)}
    >
      <span onClick={() => navigate(`/detail/${id}`)}>
        {!isProcessing ? text : isProcessing}
      </span>
      <div>
        {!isProcessing ? (
          <>
            <CheckboxOutline
              width="30px"
              height="30px"
              color="green"
              style={{ display: isDone ? "none" : "", cursor: "pointer" }}
              onClick={() => {
                setIsProcessing("완료할까요?");
              }}
            />
            <TrashOutline
              width={"30px"}
              height="30px"
              color={isDone ? "#eee" : "red"}
              style={pointerStyle}
              onClick={() => {
                setIsProcessing("삭제할까요?");
              }}
            />
          </>
        ) : (
          <>
            <CheckmarkOutline
              width="30px"
              height="30px"
              color="green"
              style={pointerStyle}
              onClick={handleConfirm}
            />
            <CloseOutline
              width="30px"
              height="30px"
              color="red"
              style={pointerStyle}
              onClick={handleCancel}
            />
          </>
        )}
      </div>
    </ItemStyle>
  );
};

const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => (props.textColor ? "#fff" : "black")};
  background-color: ${({ bgColor }) => bgColor};
`;

export default Item;
