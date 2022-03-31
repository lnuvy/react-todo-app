import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { AddBucketFB } from "../redux/modules/bucket";

import { InputWrap } from "../Styled";

const InputBucket = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const addBucket = () => {
    // 공백만 있는지 검사하는 정규식
    var blank_pattern = /^\s+|\s+$/g;
    const text = ref.current.value;

    if (text.replace(blank_pattern, "") === "") {
      console.log("공백검사");
      return;
    }
    dispatch(AddBucketFB({ id: new Date().getTime() + "", text }));
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) addBucket();
  };

  return (
    <InputWrap>
      <input
        type="text"
        ref={ref}
        placeholder="추가할 버킷을 입력하세요..."
        onKeyUp={pressEnter}
      />
      <button onClick={addBucket}>추가하기</button>
    </InputWrap>
  );
};

export default InputBucket;
