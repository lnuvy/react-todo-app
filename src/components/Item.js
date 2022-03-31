import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBucketFB, doneBucketFB } from "../redux/modules/bucket";

import { ItemStyle } from "../Styled";
import {
  IoIosCheckboxOutline,
  IoMdTrash,
  IoIosCheckmark,
  IoIosClose,
} from "react-icons/io";

const Item = (props) => {
  const { id, text, completed } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDone, setIsDone] = useState(completed);
  const [isProcessing, setIsProcessing] = useState(null);

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
    console.log("여기 이제 수정해야합니다");
    console.log(completed);
    if (isProcessing === "완료할까요?") dispatch(doneBucketFB(id, !completed));
    else dispatch(deleteBucketFB(id));
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

export default Item;
