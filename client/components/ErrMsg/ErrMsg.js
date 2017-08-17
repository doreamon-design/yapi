import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './ErrMsg.scss';

/**
 * 错误信息提示
 *
 * @component ErrMsg
 * @examplelanguage js
 *
 * * 错误信息提示组件
 * * 错误信息提示组件
 *
 *
 */

 /**
 * 标题
 * 一般用于描述错误信息名称
 * @property title
 * @type string
 * @description 一般用于描述错误信息名称
 * @returns {object}
 */
class ErrMsg extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    desc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    opration: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  render () {
    let { type, title, desc, opration } = this.props;
    if (type) {
      switch (type) {
        case 'noProject':
          title = '该分组还没有项目呢';
          desc = <span>请点击右上角 “<Icon type="plus-circle" />” 按钮新建项目</span>;
          break;
        case 'noData':
          title = '暂无数据';
          desc = '先去别处逛逛吧';
          break;
        default:
          console.log('default');
      }
    }
    return (
      <div className="err-msg">
        <Icon type="frown-o" className="icon" />
        <p className="title">{title}</p>
        <p className="desc">{desc}</p>
        <p className="opration">{opration}</p>
      </div>
    )
  }
}

export default ErrMsg;
