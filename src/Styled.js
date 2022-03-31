import styled from "styled-components";

const BucketDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 75%;
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

export { BucketDiv, InputWrap, ItemStyle };
