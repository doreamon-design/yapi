import React, { PureComponent as Component } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import ProjectMessage from './ProjectMessage/ProjectMessage.js';
import ProjectEnv from './ProjectEnv/index.js';
import ProjectRequest from './ProjectRequest/ProjectRequest';
import ProjectToken from './ProjectToken/ProjectToken';
import ProjectMock from './ProjectMock/index.js';
import { connect } from 'react-redux';
import * as qs from '@zcorky/query-string';

const TabPane = Tabs.TabPane;
const plugin = require('client/plugin.js');

const routers = {}

import './Setting.scss';

@connect(state => {
  return {
    curProjectRole: state.project.currProject.role
  }
})
class Setting extends Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    curProjectRole: PropTypes.string
  };

  state = {
    activeKey: this.defaultTab
  };

  get query() {
    return qs.parse(this.props.location.search);
  }

  get defaultTab() {
    return String(this.query.tab || 1).toLowerCase();
  }

  onTabChange = (activeKey) => {

    this.setState({
      activeKey
    });
  }

  render() {
    const id = this.props.match.params.id;
    plugin.emitHook('sub_setting_nav', routers);

    return (
      <div className="g-row">
        <Tabs
          className="has-affix-footer tabs-large"
          type="card"
          defaultActiveKey={this.defaultTab}
          onChange={this.onTabChange}
        >
          <TabPane tab="项目配置" key="1">
            <ProjectMessage projectId={+id} />
          </TabPane>
          <TabPane tab="环境配置" key="2">
            <ProjectEnv projectId={+id} />
          </TabPane>
          <TabPane tab="请求配置" key="3">
            <ProjectRequest projectId={+id} />
          </TabPane>
          {this.props.curProjectRole !== 'guest' ? (
            <TabPane tab="token配置" key="4">
              <ProjectToken projectId={+id} curProjectRole={this.props.curProjectRole} />
            </TabPane>
          ) : null}
          <TabPane tab="全局mock脚本" key="5">
            <ProjectMock projectId={+id} />
          </TabPane>
          {Object.keys(routers).map(key => {
            const C = routers[key].component;

            return (
              <TabPane tab={routers[key].name} key={String(routers[key].name).toLowerCase()}>
                <C projectId={+id} />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default Setting;
