import { useEffect, useState, useMemo } from 'react';
import {
  Row,
  Col,
  Typography,
  Table,
  Select,
  Form,
} from 'antd';
import {
  DashBoardProps,
} from './types';
import API from '../API';

const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

const DashBoard = ({ filename }: DashBoardProps) => {
  const [datas, setDatas] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string[]>([]);

  useEffect(() => {
    API.get('/read?filename='+filename).then((res) => setDatas(res.data));
  }, [filename]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  const worlds = useMemo(() => Array.from(new Set(datas.map(d => d?.worldUUID ?? ''))), [datas]);
  const players = useMemo(() => Array.from(new Set(datas.map(d => d?.player ?? ''))), [datas]);
  const events = useMemo(() => Array.from(new Set(datas.map(d => d?.event))), [datas]);
  const displayData = useMemo(() => datas
    .filter((d) => selectedPlayer.length ? selectedPlayer.includes(d.player ?? '') : d)
    .filter((d) => selectedEvent.length ? selectedEvent.includes(d.event ?? '') : d)
  , [datas, selectedPlayer]);

  console.log(displayData);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
    },
  ];

  return (
    <Row>
      <Col xs={24}>
        <Title>{filename}</Title>
      </Col>
      <Col xs={24}>
        <Form>
          <Item label="World">
            <Select mode="multiple" >
              {
                worlds.map((world: string, index: number) => (
                  <Option key={`world-${index}`} value={world}>
                    {world}
                  </Option>
                ))
              }
            </Select>
          </Item>
          <Item label="Player">
            <Select mode="multiple" onChange={(values: string[]) => setSelectedPlayer(values)}>
              {
                players.map((player: string, index: number) => (
                  <Option key={`player-${index}`} value={player}>
                    {player}
                  </Option>
                ))
              }
            </Select>
          </Item>
          <Item label="Event">
            <Select mode="multiple" onChange={(values: string[]) => setSelectedEvent(values)}>
              {
                events.map((event: string, index: number) => (
                  <Option key={`event-${index}`} value={event}>
                    {event}
                  </Option>
                ))
              }
            </Select>
          </Item>
        </Form>

      </Col>
      <Col xs={24}>
        <Table
          columns={columns}
          dataSource={displayData}
        />
      </Col>
    </Row>
  );
};

export default DashBoard;
