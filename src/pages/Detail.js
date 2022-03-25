import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBucket, updateBucket } from "../redux/modules/bucket";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { index: id } = params;
  const bucket = useSelector((state) => state.bucket.list).filter(
    (list) => list.id === id
  )[0];

  return (
    <div>
      <h1>{bucket.text}</h1>
      <button
        onClick={() => {
          dispatch(updateBucket(id));
        }}
      >
        완료하기
      </button>
      <button
        onClick={() => {
          dispatch(deleteBucket(id));
          navigate("/");
        }}
      >
        삭제하기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Detail;
