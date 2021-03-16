import styled from 'styled-components';
import { Button } from 'antd';

export const NavBar = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background: #333333aa;
  box-shadow: 0 0 10px #333;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1em;
`;

export const ButtonLink = styled(Button)`
  border: 0;
  margin-bottom: 1em;

  & .ant-tag {
    margin-left: .5em;
  }
`;
