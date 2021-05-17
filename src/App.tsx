import { useState } from 'react';
import { AppContainer } from './styles';
import { Modal, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import 'antd/dist/antd.dark.css';

const App = () => {
  const [activeLog, setActiveLog] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (show: boolean) => setShowModal(show);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <AppContainer>
      <Navigation
        setActiveLog={setActiveLog}
        toggleModal={toggleModal}
      />
      <Dashboard filename={activeLog}/>
      <Modal
        title="Read log"
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <Form>
          <Form.Item label="Dragger">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </AppContainer>
  );
}

export default App;
//
// logs = log.split('\n');
// auth = logs.filter(x => x.includes('User Authenticator'));
// /UUID of player ((\d|\w)+)/.exec(auth[0])[1];
// /(\d|\w){8}-(\d|\w){4}-(\d|\w){4}-(\d|\w){4}-(\d|\w){12}/.exec(auth[0])[0];
// auth.map(x => {
// const username= /UUID of player ((\d|\w)+)/.exec(x);
// const uid = /(\d|\w){8}-(\d|\w){4}-(\d|\w){4}-(\d|\w){4}-(\d|\w){12}/.exec(x);
// if (username && uid) return {username: username[1], uid: uid[0]}
// else console.log(x)
// }).reduce((acc, curr) => acc.find(x => x?.uid === curr?.uid) ? [...acc] : [...acc,curr] ,[])
// .filter(x => x)
// .sort((a,b) => a.username > b.username ? -1 : 1)
