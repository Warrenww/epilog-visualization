import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { NavBar } from './styles';

const Navigation = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerChildrenVisible, setDrawerChildrenVisible] = useState(false);

  return (
    <>
    <NavBar>
      <Button onClick={() => setDrawerVisible(!drawerVisible)} shape="circle" icon={<MenuOutlined />} />
    </NavBar>
    <Drawer
          title="Multi-level drawer"
          width={325}
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          placement="left"
        >
          <Button type="primary" onClick={() => setDrawerChildrenVisible(true)}>
            Two-level drawer
          </Button>
          <Drawer
            title="Two-level Drawer"
            width={320}
            closable={false}
            onClose={() => setDrawerChildrenVisible(false)}
            visible={drawerChildrenVisible}
            placement="left"
          >
            This is two-level drawer
          </Drawer>
    </Drawer>
    </>
  )
};

export default Navigation;
