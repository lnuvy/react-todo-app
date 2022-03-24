// 리액트 패키지를 불러옵니다.
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxOutline } from "react-ionicons";
import { TrashOutline } from "react-ionicons";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";

const BucketList = (props) => {
  const navigate = useNavigate();
  const my_lists = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();

  const bucket_icon = {
    cursor: "pointer",
  };

  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle completed={list.completed} key={index}>
            <span
              onClick={() => {
                navigate("/detail/" + index);
              }}
            >
              {list.text}
            </span>
            <div>
              {list.completed ? null : (
                <CheckboxOutline
                  onClick={() => dispatch(updateBucket(index))}
                  width="30px"
                  height="30px"
                  color="green"
                  style={bucket_icon}
                />
              )}
              <TrashOutline
                onClick={() => dispatch(deleteBucket(index))}
                width={"30px"}
                height="30px"
                color={list.completed ? "#fff" : "tomato"}
                style={bucket_icon}
              />
            </div>
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
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