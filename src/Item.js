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
  // const navigate = useNavigate();
  const [isDone, setIsDone] = useState(completed);
  const [isProcessing, setIsProcessing] = useState(null);

  const dispatch = useDispatch();

  // css속성
  const pointerStyle = {
    cursor: "pointer",
  };
  const testStyle = {
    padding: "0 100px 0 0",
  };

  // 미완료, 완료 버킷 색깔 리턴
  const bucketColor = (isDone, isProcessing) => {
    if (isProcessing)
      return isProcessing !== "삭제할까요?" ? "#17ef1769" : "#ff57228f";
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
    <ItemStyle bgColor={() => bucketColor(isDone, isProcessing)}>
      <span style={(pointerStyle, testStyle)}>
        {isProcessing ? isProcessing : text}
      </span>
      <div>
        {!isProcessing ? (
          <>
            <CheckboxOutline
              width="30px"
              height="30px"
              color="green"
              style={pointerStyle}
              onClick={() => {
                setIsProcessing("완료할까요?");
              }}
            />
            <TrashOutline
              width={"30px"}
              height="30px"
              color={"tomato"}
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
  background-color: ${({ bgColor }) => bgColor};
`;

export default Item;
