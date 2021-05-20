import React from 'react';
import { Modal, Form, Upload } from 'antd';
import { loadAsync } from 'jszip';
import { InboxOutlined } from '@ant-design/icons';
import { StyledForm } from './styles';

const SettingPage = () => {
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    return false;
  };
  const handleMinecraftLog = (file: File) => {
    console.log(file);
    return false;
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <StyledForm {...layout}>
        <Form.Item label="Minecraft Log">
          <Form.Item name="minecraftLog" valuePropName="fileList" noStyle>
            <Upload.Dragger name="files" beforeUpload={handleMinecraftLog} multiple accept=".gz, .log, .zip">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Epilog Log">
          <Form.Item name="epilog" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </StyledForm>
    </>
  )
};

export default SettingPage;
