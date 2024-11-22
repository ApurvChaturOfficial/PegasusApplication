import styled from "styled-components";


const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  padding: 0;
  overflow-y: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  padding: 0;
  overflow-y: auto;
`;

export {
  MainContainer,
  LeftContainer,
  RightContainer,
}
