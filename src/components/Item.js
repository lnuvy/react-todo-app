import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { IoIosCheckboxOutline } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteBucket, updateBucket } from "../redux/modules/bucket";

const Item = (props) => {
  const { id, text, completed } = props;
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(completed);
  const [isProcessing, setIsProcessing] = useState(null);

  const dispatch = useDispatch();

  // css속성
  const iconStyle = {
    cursor: "pointer",
    width: "30px",
    height: "30px",
  };

  const doneIconStyle = {
    cursor: "pointer",
    width: "30px",
    height: "30px",
    display: `${isDone ? "none" : ""}`,
  };

  // 버킷 배경색 리턴
  const bucketColor = (isDone, isProcessing) => {
    if (isProcessing)
      return isProcessing !== "삭제할까요?" ? "#7fff7fc4" : "#ff57228f";
    else return isDone ? "#a673ff" : "aliceblue";
  };

  const handleCancel = () => {
    setIsProcessing(null);
  };

  const handleConfirm = () => {
    // if (isProcessing === "삭제할까요?") dispatch(deleteBucket(id));
    // else dispatch(updateBucket(id));
    // setIsProcessing(null);
    // setIsDone(true);
    console.log("여기 이제 수정해야합니다");
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
            <IoIosCheckboxOutline
              color="green"
              style={doneIconStyle}
              onClick={() => {
                setIsProcessing("완료할까요?");
              }}
            />
            <IoMdTrash
              color={isDone ? "#eee" : "red"}
              style={iconStyle}
              onClick={() => {
                setIsProcessing("삭제할까요?");
              }}
            />
          </>
        ) : (
          <>
            <IoIosCheckmark
              color="green"
              style={iconStyle}
              onClick={handleConfirm}
            />
            <IoIosClose color="red" style={iconStyle} onClick={handleCancel} />
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
