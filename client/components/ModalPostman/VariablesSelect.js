import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd';
import { connect } from 'react-redux';
import { fetchVariableParamsList } from '../../reducer/modules/interfaceCol.js'
const TreeNode = Tree.TreeNode;
const CanSelectPathPrefix = 'CanSelectPath-';

function deleteLast(str) {
  return str.split('.').slice(0, -1).join('.');

}

@connect(
  state => {
    return {
      currColId: state.interfaceCol.currColId
    }
  },
  {
    fetchVariableParamsList
  }
)
class VariablesSelect extends Component {

  static propTypes = {
    click: PropTypes.func,
    currColId: PropTypes.number,
    fetchVariableParamsList: PropTypes.func

  }
  state = {
    records: [],
    expandedKeys: []
  }

  async componentDidMount() {
    const { currColId, fetchVariableParamsList } = this.props
    let result = await fetchVariableParamsList(currColId);
    this.setState({
      records: result.payload.data.data
      // records:record
    })
    // console.log(deleteLast('$.www.rertttty.ffghhh.dddd.wwwww'));


  }

  handleSelect = (key) => {
    if (key && key.indexOf(CanSelectPathPrefix) === 0) {
      key = key.substr(CanSelectPathPrefix.length)
      console.log(key)
      this.props.click(key);
    } else {
      this.setState({
        expandedKeys: [key]
      })
    }

  }

  onExpand = (keys) => {
    this.setState({ expandedKeys: keys })
  }

  render() {
    const pathSelctByTree = (data, elementKeyPrefix = '$', deepLevel = 0) => {
      let keys = Object.keys(data);
      let TreeComponents = keys.map((key, index) => {
        let item = data[key], casename;
        if (deepLevel === 0) {
          elementKeyPrefix = '$'
          elementKeyPrefix = elementKeyPrefix + '.' + item._id;
          casename = item.casename;
          item = {
            params: item.params,
            body: item.body
          }
        } else if (Array.isArray(data)) {
          elementKeyPrefix = index === 0 ?
            elementKeyPrefix + '[' + key + ']' : deleteLast(elementKeyPrefix) + '[' + key + ']';

        } else {
          elementKeyPrefix = index === 0 ?
            elementKeyPrefix + '.' + key : deleteLast(elementKeyPrefix) + '.' + key;

        }
        // console.log('elementKeyPrefix',elementKeyPrefix);
        if (item && typeof item === 'object') {
          return <TreeNode key={elementKeyPrefix} title={casename || key}>{pathSelctByTree(item, elementKeyPrefix, deepLevel + 1)}</TreeNode>;
        }
        // elementKeyPrefix = 
        return <TreeNode key={CanSelectPathPrefix + elementKeyPrefix} title={key} />;

      })

      // elementKeyPrefix = deleteLast(elementKeyPrefix);
      return TreeComponents
    }
    return (
      <div className="modal-postman-form-variable">
        <Tree
          expandedKeys={this.state.expandedKeys}
          onSelect={([key]) => this.handleSelect(key)}
          onExpand={this.onExpand}
        >
          {pathSelctByTree(this.state.records)}
        </Tree>
      </div>
    )
  }
}

export default VariablesSelect;