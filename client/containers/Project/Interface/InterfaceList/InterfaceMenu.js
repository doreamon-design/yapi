import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchInterfaceList, fetchInterfaceData, changeInterfaceId, addInterfaceData, deleteInterfaceData } from '../../../../reducer/modules/interface.js';
import { Menu, Input, Icon, Tag, Modal, message } from 'antd';
import AddInterfaceForm from './AddInterfaceForm';
import axios from 'axios'

const confirm = Modal.confirm;



@connect(
  state => {
    return {
      list: state.inter.list,
      curProject: state.project.curProject,
      interfaceId: state.inter.interfaceId
    }
  },
  {
    fetchInterfaceList,
    fetchInterfaceData,
    changeInterfaceId,
    addInterfaceData,
    deleteInterfaceData
  }
)
class InterfaceMenu extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    interfaceId: PropTypes.number,
    list: PropTypes.array,
    fetchInterfaceList: PropTypes.func,
    curProject: PropTypes.object,
    fetchInterfaceData: PropTypes.func,
    changeInterfaceId: PropTypes.func,
    addInterfaceData: PropTypes.func,
    deleteInterfaceData: PropTypes.func
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      curKey: null,
      visible: false,
      delIcon: null,
      filter: ''
    }
  }

  async handleRequest() {
    let result = await this.props.fetchInterfaceList(this.props.projectId);
    let interfaces = result.payload.data;
    if (interfaces.length > 0) {
      this.props.changeInterfaceId(interfaces[0]._id)
      await this.props.fetchInterfaceData(interfaces[0]._id)
    }
  }

  componentWillMount() {
    this.handleRequest()
  }

  onSelect = (item) => {
    this.props.changeInterfaceId(parseInt(item.key, 10))
    this.props.fetchInterfaceData(parseInt(item.key, 10))
  }

  handleAddInterface = (data) => {
    data.project_id = this.props.projectId;
    axios.post('/api/interface/add', data).then((res) => {
      if (res.data.errcode !== 0) {
        return message.error(res.data.errmsg);
      }
      message.success('接口添加成功')
      this.props.addInterfaceData(res.data.data)
      this.setState({
        visible: false
      });

    })
  }

  showConfirm = (id)=> {
    let that = this;
    confirm({
      title: '您确认删除此接口',
      content: '温馨提示：接口删除后，无法恢复',
      onOk() {
        that.props.deleteInterfaceData(id)
      },
      onCancel() { }
    });
  }

  delInterface = (id) => {

    this.props.deleteInterfaceData(id)
  }

  enterItem = (e) => {
    this.setState({ delIcon: e.key })
  }

  leaveItem = () => {
    this.setState({ delIcon: null })
  }

  onFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    const items = [];
    this.props.list.forEach((item) => {
      let color, filter = this.state.filter;
      if(filter && item.title.indexOf(filter) === -1 && item.path.indexOf(filter) === -1){
        return null;
      }
      switch (item.method) {
        case 'GET': color = "green"; break;
        case 'POST': color = "blue"; break;
        case 'PUT': color = "yellow"; break;
        case 'DELETE': color = 'red'; break;
        default: color = "green";
      }

      items.push(
        <Menu.Item onMouseEnter={this.enterItem} onMouseLeave={this.leaveItem} key={"" + item._id}>
          <Tag className="btn-http" color={color}>{item.method}  </Tag>
          {item.title}
          <Icon type="delete" onClick={()=> {this.showConfirm(item._id)}} style={{ display: this.state.delIcon == item._id ? 'block' : 'none' }} className="interface-delete-icon" />
        </Menu.Item>
      )
    })

    return <div>
      <div className="interface-filter">
        <Input onChange={this.onFilter} value={this.state.filter} placeholder="Filter by name" style={{ width: "70%" }} />
        <Tag onClick={this.showModal} color="#108ee9" style={{ marginLeft: "15px" }} ><Icon type="plus" /></Tag>
        <Modal
          title="添加接口"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddInterfaceForm onCancel={this.handleCancel} onSubmit={this.handleAddInterface} />
        </Modal>
      </div>
      <Menu selectedKeys={[this.props.interfaceId + ""]} className="interface-list" onSelect={this.onSelect}>
        {items}
      </Menu>
    </div>

  }
}

export default InterfaceMenu