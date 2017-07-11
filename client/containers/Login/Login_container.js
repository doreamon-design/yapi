import { connect } from 'react-redux'
import Login from './Login.js'

// Action
const increaseAction = { type: 'increase' }

function mapStateToProps() {
  return {
    per: '测试数据'
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default App
