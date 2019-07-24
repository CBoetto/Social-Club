import React, {useState, useEffect} from 'react';
import {setUser, removeUser} from '../../store/user'
import {connect} from 'react-redux'

import Register from './register'
import Login from './login'
import Logout from './logout'

import { Button } from 'semantic-ui-react'

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
}

const Auth = (props) => {

    // Use state to toggle between the log in and register forms.

    const [register, setRegister] = useState(false)

    const toggleRegister = () => {
        setRegister(!register)
    }

    return (
            <div id='auth'>
                {props.userStore.user ?
                    <Logout />
                    :
                    <>
                        {register ? 
                            <div id='register'>
                            <Register />
                            <Button basic onClick={toggleRegister}>or login</Button>
                            </div>
                            :
                            <div id='login'>
                            <Login />
                            <Button basic onClick={toggleRegister}>or register</Button>
                            </div>
                        }
                </>
                }
            </div>
    )
}

export default connect(mapStateToProps, null)(Auth)