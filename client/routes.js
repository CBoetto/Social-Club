import React, {Component, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'


import Forum from './components/forum/forum'
import SubForum from './components/forum/subForum'
import Thread from './components/forum/thread'
import CreateThread from './components/forum/createThread'
// import MinForum from './components/forum/minForum.js'
// import Chat from './components/chat/chat.js'
// import MinChat from './components/chat/minChat.js'


/**
 * COMPONENT
 */
const Routes = (props) => {

  // useEffect(() => {
  //   props.loadInitialData()
  // }, [])

  return (
      <div id='router_content'>
        <Switch>
          
            {/* Routes placed here are available to all visitors */}
            <Route path="/" exact component={Forum} />
            <Route path="/subforum/:subForumName" exact component={SubForum} />
            <Route path="/subforum/:subForumName/thread/:threadId" exact component={Thread} /> 
            <Route path="/subforum/:subForumName/newThread" exact component={CreateThread} />
                {/* Routes placed here are only available after logging in */}
                {/* <Route path="/home" component={UserHome} />
              </Switch>
            )}             */}

            {/* Displays our Login component as a fallback */}
        </Switch>
      </div>

  )
}




/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.userStore.id
  }
}

const mapDispatch = dispatch => {
  return {
    // loadInitialData() {
    //   dispatch(me())
    // }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
