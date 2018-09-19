import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Layout from 'Component/Layout'

import App from 'Container/App'
import About from 'Container/About'

export default (
  <HashRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/about' component={About} />
      </Switch>
    </Layout>
  </HashRouter>
)
