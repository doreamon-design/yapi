import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatTime } from 'client/common.js';
import { Form, Switch, Button, Icon, Tooltip, message, Input, Select } from 'antd';
import {handleSwaggerUrlData} from 'client/reducer/modules/project';
const FormItem = Form.Item;
const Option = Select.Option;
import axios from 'axios';

// layout
const formItemLayout = {
  labelCol: {
    lg: { span: 5 },
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    lg: { span: 16 },
    xs: { span: 24 },
    sm: { span: 12 }
  },
  className: 'form-item'
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 11
    }
  }
};

@connect(
  state => {
    return {
      projectMsg: state.project.currProject
    };
  },
  {
    handleSwaggerUrlData
  }
)
@Form.create()
export default class WebhookPluginComponent extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="m-panel">
        hi webhook
      </div>
    );
  }
}
