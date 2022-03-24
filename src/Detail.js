import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const bucket_index = parseInt(params.index);
  const bucket_list = useSelector((state) => state.bucket.list);

  console.log(bucket_list, bucket_index);

  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <button
        onClick={() => {
          dispatch(updateBucket(bucket_index));
        }}
      >
        완료하기
      </button>
      <button
        onClick={() => {
          dispatch(deleteBucket(bucket_index));
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
