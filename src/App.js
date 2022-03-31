import React from "react";
import { Route, Routes } from "react-router-dom";
import { BucketList, Detail, NotFound } from "./pages";
import { InputBucket, Progress, Search } from "./components";

import "./App.css";
import styled from "styled-components";

//
function App() {
  return (
    <div className="App">
      <Search />
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
      <InputBucket />
    </div>
  );
}

const Container = styled.div`
  background-color: #fff;
  min-width: 300px;
  width: 60vw;
  max-width: 350px;
  min-height: 60vh;
  max-height: 60vh;
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

export default App;
