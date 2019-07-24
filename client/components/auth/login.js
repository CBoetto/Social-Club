import React, {useState, useEffect} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {setUser} from '../../store/user'
import {connect} from 'react-redux'
import { Button , Input} from 'semantic-ui-react'


// Put the user from Redux onto the props of this component.

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


// Put the "setUser" function from Redux onto the props of this component.
// The "setUser" function will, predictably, set a user's information onto the Redux store.

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
    }
}    


// This is the login mutation we send to the GraphQL server.

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            userName
            id
        }
    }
`

const Login = (props) => {


    // These two pieces of state are tied to the login forms, and sent to the GQL server
    // via our login mutation.

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    // Once the login mutation is completed, we run this function

    const confirmLogin = (data) => {
        console.log('data from user login', data)
        props.setUser({
            userName: data.login.userName,
            points: 'set points here',
            id: data.login.id
        })
    }




    return (
        <>
            <form id='loginForm' onSubmit={e => {
                e.preventDefault()
            }}>
                <Input
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    type='text'
                    placeholder='Username'
                    id='userNameForm'
                />
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='text'
                    placeholder='Password'
                    id='passwordForm'
                />
                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{ userName, password }}
                    onCompleted={data => confirmLogin(data)}
                >
                    {mutation => (
                    <Button color='green' type="submit" onClick={mutation}>
                        Login
                    </Button>
                    // <div className='mutation-button' onClick={mutation}>
                    //     {'login'}
                    // </div>
                    )}
                </Mutation>
            </form>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)