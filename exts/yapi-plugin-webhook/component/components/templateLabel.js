/* eslint-disable */

import React from 'react';
import { Icon, Popover } from 'antd';
import Highlight from 'react-highlight';

const METADAT_INTERFACE = `{
  // 复合标题
  title: string;

  // 复合内容
  content: string;

  // 修改者
  modifier: {
    name: string;
  };

  // 接口所在项目
  project: {
    name: string;
  };

  // 接口自身信息
  api: {
    name: string;
    method: string;
    path: string;
    // 在线文档地址
    docUrl: string;
    // 在线地址
    onlineUrl: string;
  };

  // diff 信息
  diff: {
    // diff html
    html: string;
  };
}`;

const TEMPLATE_DEMO = `
// 以飞书 webhook 为例
//  {{NAME}} 模板表示
//  支持 . 对象操作, 比如 modifier.name
{
  "title": "{{title}}",
  "text": "{{content}} - Custom API PATH: {{api.path}}"
}
`;

export default function TemplateLabel(props) {
  const { onFormat } = props;

  const content = (
    <div className="webhook-template-label-tip" style={{ minWidth: 500 }}>
      <p>
        通过模板字符串构造，比如，如果你想使用 title, content 和 api path
        <Highlight>{TEMPLATE_DEMO}</Highlight>
      </p>
      <p>内置数据模型(metadata)</p>
      <Highlight>{METADAT_INTERFACE}</Highlight>
    </div>
  );

  return (
    <Popover
      trigger="hover"
      title="模板消息如何使用?"
      content={content}
    >
      <div className="webhook-template-label">
        <span>
          模板消息
          <Icon type="question-circle" />
        </span>
        （<a onClick={onFormat}>格式化</a>）
      </div>
    </Popover>
  );
}