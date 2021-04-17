import { useEffect, useState, useMemo } from 'react';
import {
  Row,
  Col,
  Typography,
  Checkbox,
  Table,
} from 'antd';
import {
  DashBoardProps,
} from './types';
import API from '../API';
import { CheckboxCol } from './styles';

const { Title } = Typography;

const DashBoard = ({ filename }: DashBoardProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    API.get('/read?filename='+filename).then((res) => setData(res.data));
  }, [filename]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const worlds = useMemo(() => Array.from(new Set(data.map(d => d?.worldUUID ?? ''))), [data]);
  const players = useMemo(() => Array.from(new Set(data.map(d => d?.player ?? ''))), [data]);

  return (
    <Row>
      <Col xs={24}>
        <Title>{filename}</Title>
      </Col>
      <CheckboxCol xs={12}>
        <Title level={2}> Worlds </Title>
        <Checkbox.Group
          options={worlds.filter(x => x!== '')}
          defaultValue={['Apple']}
          onChange={(values) => console.log(values)}
        />
      </CheckboxCol>
      <CheckboxCol xs={12}>
        <Title level={2}> Players </Title>
        <Checkbox.Group
          options={players.filter(x => x!== '')}
          defaultValue={['Apple']}
          onChange={(values) => console.log(values)}
        />
      </CheckboxCol>
      <Col xs={24}>
        <Table
            
        />
      </Col>
    </Row>
  );
};

export default DashBoard;
