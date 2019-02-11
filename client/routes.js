import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import Main from './components/main'

/**
 * COMPONENT
 */
export default class Routes extends Component {

  render() {

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Main} />
      </Switch>
    )
  }
}