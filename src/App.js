import React, { useRef } from "react";
import BucketList from "./BucketList";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import { useDispatch } from "react-redux";
import { createBucket } from "./redux/modules/bucket";
import Progress from "./Progress";
import NotFound from "./NotFound";

function App() {
  const text = useRef(null);
  const dispatch = useDispatch();

  const addBucket = () => {
    dispatch(createBucket(text.current.value));
  };

  return (
    <AppWrap>
      <Container>
        <Title>버킷 리스트</Title>
        <Progress />
        <Line />
        <Routes>
          <Route path="/" element={<BucketList />} />
          <Route path="/detail/:index" element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
      <InputWrap>
        <input
          type="text"
          ref={text}
          placeholder="추가할 버킷을 입력하세요..."
        />
        <button onClick={addBucket}>추가하기</button>
      </InputWrap>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  background-color: #eee;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  background-color: #fff;
  min-width: 300px;
  width: 60vw;
  max-width: 350px;
  min-height: 60vh;
  margin: auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
`;

const InputWrap = styled.div`
  background-color: #fff;
  max-width: 350px;
  width: 60vw;
  min-width: 300px;
  min-height: 10vh;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  & > * {
    padding: 5px;
    font-size: 1.1rem;
  }
  & input {
    border: 1px solid #888;
    width: 70%;
    height: 50%;
    margin-right: 10px;
    padding: 0 0 0 20px;
  }
  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }
  & button {
    height: 50%;
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;

export default App;
