import { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Tag,
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

const Navigation = ({ setActiveLog }: NavigationProps) => {
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
          {
              fileList.map((file) => (
                file.files ? (
                  <ButtonLink
                    block
                    onClick={() => {
                      setDrawerChildrenVisible(true);
                      setDrawerChildrenContent(file.files);
                      setDrawerChildrenName(file.name);
                    }}
                    icon={<FolderOpenOutlined />}
                  >
                    {file.name}
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    block
                    icon={<FileTextOutlined />}
                    onClick={() => setActiveLog(file.name)}
                  >
                      {file.name}
                      <SizeTag size={file.size}/>
                    </ButtonLink>
                )
              ))
          }
          <Drawer
            title={drawerChildrenName}
            width={350}
            closable={false}
            onClose={() => {
              setDrawerChildrenVisible(false);
              setDrawerChildrenContent(undefined);
            }}
            visible={drawerChildrenVisible}
            placement="left"
          >
            {
              drawerChildrenContent?.map((file) => (
                <ButtonLink
                  block
                  icon={<FileTextOutlined />}
                  onClick={() => setActiveLog(`${drawerChildrenName}/${file.name}`)}
                >
                    {file.name}
                    <SizeTag size={file.size}/>
                  </ButtonLink>
              ))
            }
          </Drawer>
    </Drawer>
    </>
  )
};

export default Navigation;
