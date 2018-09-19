import React, { Component } from 'react'

class App extends Component {
  render () {
    console.log('App')
    return (
      <div className='App'>
        这是主页
        <img src='/static/images/demo.jpg' />
      </div>
    )
  }
}

export default App
