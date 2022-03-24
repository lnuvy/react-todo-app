// 리액트 패키지를 불러옵니다.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxOutline } from "react-ionicons";
import { TrashOutline } from "react-ionicons";
import { CheckmarkOutline } from "react-ionicons";
import { CloseOutline } from "react-ionicons";

import { deleteBucket, updateBucket } from "./redux/modules/bucket";

const BucketList = () => {
  const [checkConfirm, setCheckConfirm] = useState(null);
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const navigate = useNavigate();
  const my_lists = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();

  console.log(my_lists);

  const pointerStyle = {
    cursor: "pointer",
  };
  const testStyle = {
    padding: "0 100px 0 0",
  };

  const handleCancel = () => {
    setCheckConfirm(null);
    setRemoveConfirm(null);
  };

  const handleConfirm = (index, type) => {
    console.log(type);
    switch (type) {
      case "check":
        dispatch(updateBucket(index));
        setCheckConfirm(null);
        break;
      case "remove":
        dispatch(deleteBucket(index));
        setRemoveConfirm(null);
        break;
      default:
        return;
    }
  };

  return (
    <BucketDiv>
      {my_lists.map((list, index) => {
        if (checkConfirm === index)
          return (
            <ItemStyle
              style={{ background: "#17ef178a" }}
              key={`confirm_${index}`}
            >
              "{list.text}" 완료하셨나요 ?
              <div>
                <CheckmarkOutline
                  width="30px"
                  height="30px"
                  color="green"
                  style={pointerStyle}
                  onClick={() => handleConfirm(index, "check")}
                />
                <CloseOutline
                  width="30px"
                  height="30px"
                  color="red"
                  style={pointerStyle}
                  onClick={handleCancel}
                />
              </div>
            </ItemStyle>
          );
        else if (removeConfirm === index)
          return (
            <ItemStyle
              style={{ background: "#ff5722d1" }}
              key={`remove_${index}`}
            >
              "{list.text}" 삭제할까요 ?
              <div>
                <CheckmarkOutline
                  width="30px"
                  height="30px"
                  color="green"
                  style={pointerStyle}
                  onClick={() => handleConfirm(index, "remove")}
                />
                <CloseOutline
                  width="30px"
                  height="30px"
                  color="red"
                  style={pointerStyle}
                  onClick={handleCancel}
                />
              </div>
            </ItemStyle>
          );
        // 기본 리스트
        else
          return (
            <ItemStyle completed={list.completed} key={`view_${index}`}>
              <span
                style={(pointerStyle, testStyle)}
                onClick={() => {
                  navigate("/detail/" + index);
                }}
              >
                {list.text}
              </span>
              <div>
                {list.completed ? null : (
                  <CheckboxOutline
                    onClick={() => setCheckConfirm(index)}
                    width="30px"
                    height="30px"
                    color="green"
                    style={pointerStyle}
                  />
                )}
                <TrashOutline
                  onClick={() => setRemoveConfirm(index)}
                  width={"30px"}
                  height="30px"
                  color={list.completed ? "#fff" : "tomato"}
                  style={pointerStyle}
                />
              </div>
            </ItemStyle>
          );
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

const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 8px;
  color: ${(props) => (props.completed ? "#fff" : "#333")};
  background-color: ${(props) => (props.completed ? "#a673ff" : "aliceblue")};
`;

export default BucketList;
