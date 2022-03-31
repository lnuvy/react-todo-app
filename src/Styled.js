import styled from "styled-components";

const BucketDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 75%;
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

export { BucketDiv, ItemStyle };
