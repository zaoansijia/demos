import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import './code/promise.js';
class App extends React.Component{

  constructor() {
    super();
    this.state =  {
      count: 0
    }
  }
  componentDidMount() {
    // 测试原生方法：手动绑定mousedown事件
    // ReactDOM.findDOMNode(this).addEventListener(
    //   "mousedown",
    //   this.click
    // );
  }
  asyncClick = async () => {
    console.log('async-pre-click',this.state.count);
    await this.setState({count:this.state.count+1});
    console.log('async-next-click',this.state.count);
  }
  click = () => {
    console.log('click-pre-count',this.state.count);
    this.asyncClick();
    console.log('click-next-count',this.state.count);
  }
  render() {
    return (
      <div>
        <h1>常见的手写代码</h1>
        <ul>
          <li>手写promise</li>
          <li onClick={this.click}>点击测试一下setState是同步还是异步</li>
        </ul>
      </div>
    )
  }
}

export default App;
