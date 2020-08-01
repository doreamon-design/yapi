/* eslint-disable */

import React, { useState, useCallback } from 'react';

import { Modal, Form, Input, Icon, Select, Button } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const UpdateForm = (props) => {
  const { form, visible, onCancel, onSubmit, onTest } = props;
  const { getFieldDecorator } = form;

  const onFormat = useCallback(() => {
    try {
      const data = JSON.stringify(JSON.parse(form.getFieldValue('template')), null, 2);
    
      form.setFieldsValue({
        'template': data,
      });
    } catch (err) {
      // error
    }
  }, [props]);

  const templateLabel = (
    <div className="webhook-template-label">
      <span>模板消息</span>
      （<a onClick={onFormat}>格式化</a>）
    </div>
  );

  const _onSumbit = useCallback(() => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (onSubmit) {          
          onSubmit(props.dataSource.uid, values, function done() {
            onCancel();
          });
        }
      }
    });
  }, [form, visible]);

  const _onTest = useCallback(() => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (onTest) {          
          onTest(values);
        }
      }
    });
  }, [form, visible]);

  const renderFooter = () => (
    <div className="webhook-modal-footer">
      <div>
        <Button type="primary" onClick={_onTest}>测试</Button>
      </div>
      <div>
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={_onSumbit}>确定</Button>
      </div>
    </div>
  );

  const renderForm = () => {
    return (
      <Form
      style={{ padding: '0 16px' }}
      layout="horizontal"
      >
        <FormItem label="名称">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '名称是必须的' },
            ],
          })(
            <Input
              placeholder="名称"
            />,
          )}
        </FormItem>
        <FormItem label="URL">
          {getFieldDecorator('url', {
            rules: [
              { required: true, message: '请输入 URL' },
              { type: 'url', message: '请输入正确的 URL' },
            ],
          })(
            <Input
              placeholder="URL"
            />,
          )}
        </FormItem>
        <FormItem label="方法">
          {getFieldDecorator('method', {
            initialValue: 'POST',
          })(
            <Select placeholder="请选择">
              <Select.Option value="GET">GET</Select.Option>
              <Select.Option value="POST">POST</Select.Option>
              <Select.Option value="PUT">PUT</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="Content Type">
          {getFieldDecorator('contentType', {
            initialValue: 'application/json',
          })(
            <Select placeholder="请选择">
              <Select.Option value="application/json">application/json</Select.Option>
              <Select.Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label={templateLabel}>
          {getFieldDecorator('template', {
            rules: [
              { required: true, message: '请选择 Content Type' },
              {
                message: '模板消息类型必须是 JSON 字符串',
                validator(rule, value, callback) {
                  try {
                    JSON.parse(value);
                    callback();
                  } catch (err) {
                    callback(err);
                  }
                },
              },
            ],
          })(
            <TextArea
              placeholder="请输入模板消息"
              rows={10}
            />,
          )}
        </FormItem>
      </Form>
    );
  };

  return (
    <Modal
      title={'编辑'}
      width={640}
      destroyOnClose
      visible={visible}
      onOk={_onSumbit}
      onCancel={onCancel}
      maskClosable={false}
      footer={renderFooter()}
    >
      {renderForm()}
    </Modal>
  );
}

export default Form.create({
  name: 'update',
  mapPropsToFields: (props) => {
    if (!props.dataSource) {
      return undefined;
    }

    return Object.keys(props.dataSource).reduce((all, key) => {
      all[key] = Form.createFormField({
        value: props.dataSource[key],
      });

      return all;
    }, {});;
  },
})(UpdateForm);
