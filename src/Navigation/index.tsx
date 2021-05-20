import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  Button,
  Tag,
  List,
} from 'antd';
import {
  MenuOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  NavBar,
  ButtonLink,
} from './styles';
import {
  FIleOrDir,
  NavigationProps,
 } from './types';
import API from '../API';

const SizeTag = ({ size }: {size: number | undefined}) => {
  if (size) {
    const caluSize = size < 1 ? Math.round(size * 1024) : Math.round(size);
    const unit = size < 1 ? 'KB' : 'MB';
    const color = size < 1 ? '#333' : ( caluSize < 100 ? 'cyan' : 'volcano');

    return (
      <Tag color={color}>{`${caluSize} ${unit}`}</Tag>
    )
  }
  return <></>;
};

const Navigation = ({
  setActiveLog,
}: NavigationProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerChildrenVisible, setDrawerChildrenVisible] = useState(false);
  const [fileList, setFileList] = useState<FIleOrDir[]>([]);
  const [drawerChildrenContent, setDrawerChildrenContent] = useState<FIleOrDir[] | undefined>(undefined);
  const [drawerChildrenName, setDrawerChildrenName] = useState<string>('');

  useEffect(() => {
    API.get('files').then(res => setFileList(res.data));
  }, []);

  return (
    <>
    <NavBar>
      <Button onClick={() => setDrawerVisible(!drawerVisible)} shape="circle" icon={<MenuOutlined />} />
    </NavBar>
    <Drawer
      title="Logs"
      width={325}
      closable={false}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      placement="left"
    >
      <List>
        <List.Item>
          <Link to='/'> Setting </Link>
        </List.Item>
        <List.Item>
          <Link to='/dashboard'> Dashboard </Link>
        </List.Item>
      </List>
    </Drawer>
    </>
  )
};

export default Navigation;
