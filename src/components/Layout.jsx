import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.less'

class Layout extends React.Component {
  render () {
    return (
      <div className='Layout'>
        <header>
          <Link to='/'>主页</Link>
          <Link to='/about'>关于</Link>
        </header>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
