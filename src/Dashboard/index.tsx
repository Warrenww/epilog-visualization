import { useEffect, useState, useMemo } from 'react';
import {
  Row,
  Col,
  Typography,
  Table,
  Button,
  Select,
} from 'antd';
import {
  DashBoardProps,
  Data,
} from './types';
import { Content } from './styles';
import API from '../API';

const { Title, Text } = Typography;
const { Option } = Select;

const DashBoard = ({ filename }: DashBoardProps) => {
  const [datas, setDatas] = useState<Data[]>([]);

  useEffect(() => {
    API.get('/read?filename='+filename).then((res) => setDatas(res.data));
  }, [filename]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  // const worlds = useMemo(() => Array.from(new Set(datas.map(d => d?.worldUUID ?? ''))), [datas]);
  const players = useMemo(() => Array.from(new Set(datas.map(d => d?.player ?? ''))).filter(x => x), [datas]);
  const events = useMemo(() => Array.from(new Set(datas.map(d => d?.event))).filter(x => x), [datas]);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 150,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      filters: events.map(x => ({
        text: x,
        value: x,
      })),
      filterMultiple: true,
      onFilter: (value: any, record: any) => record.event !== value,
    },
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
      filters: players.map(x => ({
        text: x,
        value: x,
      })),
      filterMultiple: true,
      onFilter: (value: any, record: any) => record.player === value,
    },
    {
      title: 'Rest',
      dataIndex: 'rest',
      key: 'rest',
      render: (value: any, record: any) => {
        const { time, event, worldUUID, player, ...rest } = record;
        return Object.keys(rest).length ? JSON.stringify(rest) : '-';
      },
    },
  ];

  return (
    <Content>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Title>{filename}</Title>
        </Col>
        <Col xs={4}><Text>Export :</Text></Col>
        <Col xs={8}>
          <Select style={{ width: '100%' }}>
            {
              players.map(p => (
                <Option key={p} value={p}>{p}</Option>
              ))
            }
          </Select>
        </Col>
        <Col xs={4}><Button>Export</Button></Col>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={datas}
            pagination={{
              pageSize: 100,
            }}
            scroll={{
              x: columns.reduce((width, col) => width + (col.width ?? 120), 0),
              y: 600,
            }}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default DashBoard;
