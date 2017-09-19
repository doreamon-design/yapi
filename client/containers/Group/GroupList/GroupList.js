import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Modal, Alert, Input, message, Menu, Row, Col } from 'antd'
import { autobind } from 'core-decorators';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const { TextArea } = Input;
const Search = Input.Search;
const TYPE_EDIT = 'edit';
const confirm = Modal.confirm;
import UsernameAutoComplete from '../../../components/UsernameAutoComplete/UsernameAutoComplete.js';
import {
  fetchGroupList,
  setCurrGroup,
  setGroupList
} from '../../../reducer/modules/group.js'

import './GroupList.scss'

@connect(
  state => ({
    groupList: state.group.groupList,
    currGroup: state.group.currGroup,
    curUserRole: state.user.role
  }),
  {
    fetchGroupList,
    setCurrGroup,
    setGroupList
  }
)
@withRouter
export default class GroupList extends Component {

  static propTypes = {
    groupList: PropTypes.array,
    currGroup: PropTypes.object,
    fetchGroupList: PropTypes.func,
    setCurrGroup: PropTypes.func,
    setGroupList: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object,
    curUserRole: PropTypes.string
  }

  state = {
    addGroupModalVisible: false,
    editGroupModalVisible: false,
    newGroupName: '',
    newGroupDesc: '',
    currGroupName: '',
    currGroupDesc: '',
    groupList: [],
    owner_uid: 0
  }

  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    const groupId = !isNaN(this.props.match.params.groupId) ? parseInt(this.props.match.params.groupId) : 0;
    await this.props.fetchGroupList();
    let currGroup = this.props.groupList[0] || { group_name: '', group_desc: '' };
    if (this.props.groupList.length && groupId) {
      for (let i = 0; i < this.props.groupList.length; i++) {
        if (this.props.groupList[i]._id === groupId) {
          currGroup = this.props.groupList[i];
        } else {
          this.props.history.replace(`${currGroup._id}`);
        }
      }
    } else if (!groupId && this.props.groupList.length) {
      this.props.history.push(`/group/${this.props.groupList[0]._id}`);
    }
    this.setState({ groupList: this.props.groupList });
    this.props.setCurrGroup(currGroup)
  }

  @autobind
  showModal(type) {
    if (type === 'edit') {
      const { currGroup } = this.props;
      this.setState({
        currGroupName: currGroup.group_name,
        currGroupDesc: currGroup.group_desc,
        editGroupModalVisible: true
      });
    } else {
      this.setState({
        addGroupModalVisible: true
      });
    }
  }
  @autobind
  hideModal(type) {
    if (type === TYPE_EDIT) {
      this.setState({
        editGroupModalVisible: false
      });
    } else {
      this.setState({
        addGroupModalVisible: false
      });
    }
  }
  @autobind
  async addGroup() {
    const { newGroupName: group_name, newGroupDesc: group_desc, owner_uid } = this.state;
    const res = await axios.post('/api/group/add', { group_name, group_desc, owner_uid })
    if (!res.data.errcode) {
      this.setState({
        addGroupModalVisible: false
      });
      await this.props.fetchGroupList();
      this.setState({ groupList: this.props.groupList });
      this.props.setCurrGroup(res.data.data)
    } else {
      message.error(res.data.errmsg)
    }
  }
  @autobind
  async editGroup() {
    const { currGroupName: group_name, currGroupDesc: group_desc } = this.state;
    const id = this.props.currGroup._id;
    const res = await axios.post('/api/group/up', { group_name, group_desc, id });
    if (res.data.errcode) {
      message.error(res.data.errmsg);
    } else {
      this.setState({
        editGroupModalVisible: false
      });
      await this.props.fetchGroupList();
      this.setState({ groupList: this.props.groupList });
      this.props.setCurrGroup({ group_name, group_desc, _id: id });
    }
  }
  @autobind
  inputNewGroupName(e, type) {
    if (type === TYPE_EDIT) {
      this.setState({ currGroupName: e.target.value })
    } else {
      this.setState({ newGroupName: e.target.value });
    }
  }
  @autobind
  inputNewGroupDesc(e, type) {
    if (type === TYPE_EDIT) {
      this.setState({ currGroupDesc: e.target.value })
    } else {
      this.setState({ newGroupDesc: e.target.value });
    }
  }

  @autobind
  selectGroup(e) {
    const groupId = e.key;
    const currGroup = this.props.groupList.find((group) => { return +group._id === +groupId });
    this.props.setCurrGroup(currGroup);
    this.props.history.replace(`${currGroup._id}`);
  }

  @autobind
  onUserSelect(childState) {
    this.setState({
      owner_uid: childState.uid
    })
  }

  showConfirm = () => {
    let that = this;
    confirm({
      title: "确认删除 " + that.props.currGroup.group_name + " 分组吗？",
      content: <div style={{ marginTop: '10px', fontSize: '12px', lineHeight: '25px' }}>
        <Alert message="警告：此操作非常危险,会删除该分组下面所有项目和接口，并且无法恢复!" type="warning" />
        <div style={{ marginTop: '16px' }}>
          <p><b>请输入分组名称确认此操作:</b></p>
          <Input id="group_name" />
        </div>
      </div>,
      onOk() {
        let groupName = document.getElementById('group_name').value;
        if (that.props.currGroup.group_name !== groupName) {
          message.error('分组名称有误')
          return new Promise((resolve, reject) => {
            reject('error')
          })
        } else {
          that.deleteGroup()
        }

      },
      iconType: 'delete',
      onCancel() { }
    });
  }

  @autobind
  async deleteGroup() {
    const self = this;
    const { currGroup } = self.props;
    const res = await axios.post('/api/group/del', { id: currGroup._id })
    if (res.data.errcode) {
      message.error(res.data.errmsg);
    } else {
      message.success('删除成功')
      await self.props.fetchGroupList()
      const currGroup = self.props.groupList[0] || { group_name: '', group_desc: '' };
      self.setState({ groupList: self.props.groupList });
      self.props.setCurrGroup(currGroup)
    }
  }

  @autobind
  searchGroup(e, value) {
    const v = value || e.target.value;
    const { groupList } = this.props;
    if (v === '') {
      this.setState({ groupList })
    } else {
      this.setState({ groupList: groupList.filter(group => new RegExp(v, 'i').test(group.group_name)) })
    }
  }

  render() {
    const { currGroup } = this.props;
    const delmark = <Icon className="edit-group"  type="edit" title="编辑分组" onClick={() => this.showModal(TYPE_EDIT)} />
    const editmark = <Icon className="delete-group"   onClick={() => { this.showConfirm() }} type="delete" title="删除分组" />
    const addmark = <Icon className="edit-group"  onClick={this.showModal} type="plus" title="添加分组" />

    return (
      <div className="m-group">
        <div className="group-bar">
          {
            this.props.curUserRole === "admin" || currGroup.role ==='owner' ?
              <div className="curr-group">
                <div className="curr-group-name">{currGroup.group_name} 分组管理：
                  {
                    this.props.curUserRole === "admin" ? (editmark) : ''
                  }
                  {
                    this.props.curUserRole === "admin" || currGroup.role ==='owner' ? (delmark) : ''
                  }
                  {
                    this.props.curUserRole === 'admin' ? (addmark) : ''
                  }
                </div>
              </div> : ''
          }

          <div className="group-operate">
            <div className="search">
              <Search placeholder="Filter by name" onChange={this.searchGroup} onSearch={(v) => this.searchGroup(null, v)} />
            </div>
          </div>
          <Menu
            className="group-list"
            mode="inline"
            onClick={this.selectGroup}
            selectedKeys={[`${currGroup._id}`]}
          >
            {
              this.state.groupList.map((group) => (
                <Menu.Item key={`${group._id}`} className="group-item">
                  <Icon type="folder-open" />{group.group_name}
                </Menu.Item>
              ))
            }
          </Menu>
        </div>
        {
          this.state.addGroupModalVisible?<Modal
            title="添加分组"
            visible={this.state.addGroupModalVisible}
            onOk={this.addGroup}
            onCancel={this.hideModal}
            className="add-group-modal"
          >
            <Row gutter={6} className="modal-input">
              <Col span="5"><div className="label">分组名：</div></Col>
              <Col span="15">
                <Input placeholder="请输入分组名称" onChange={this.inputNewGroupName}></Input>
              </Col>
            </Row>
            <Row gutter={6} className="modal-input">
              <Col span="5"><div className="label">简介：</div></Col>
              <Col span="15">
                <TextArea rows={3} placeholder="请输入分组描述" onChange={this.inputNewGroupDesc}></TextArea>
              </Col>
            </Row>
            <Row gutter={6} className="modal-input">
              <Col span="5"><div className="label">组长：</div></Col>
              <Col span="15">
                <UsernameAutoComplete callbackState={this.onUserSelect} />
              </Col>
            </Row>
          </Modal>:''
        }

        <Modal
          title="编辑分组"
          visible={this.state.editGroupModalVisible}
          onOk={this.editGroup}
          onCancel={() => this.hideModal(TYPE_EDIT)}
          className="add-group-modal"
        >
          <Row gutter={6} className="modal-input">
            <Col span="5"><div className="label">分组名：</div></Col>
            <Col span="15">
              <Input placeholder="请输入分组名称" value={this.state.currGroupName} onChange={(e) => this.inputNewGroupName(e, TYPE_EDIT)}></Input>
            </Col>
          </Row>
          <Row gutter={6} className="modal-input">
            <Col span="5"><div className="label">简介：</div></Col>
            <Col span="15">
              <TextArea rows={3} placeholder="请输入分组描述" value={this.state.currGroupDesc} onChange={(e) => this.inputNewGroupDesc(e, TYPE_EDIT)}></TextArea>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
