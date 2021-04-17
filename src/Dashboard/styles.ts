import styled from 'styled-components';
import { Col } from 'antd';

export const CheckboxCol = styled(Col)`
  & .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;
