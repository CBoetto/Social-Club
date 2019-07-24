import React, {useState, useEffect} from 'react';
import { AUTH_TOKEN } from '../../../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {setUser} from '../../store/user'
import {connect} from 'react-redux'

import { Button , Input} from 'semantic-ui-react'

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
    }
}

const Register = (props) => {
    // Register logic

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const confirmRegister = (data) => {
        props.setUser(data.register.user)
    }

    const REGISTER_MUTATION = gql`
        mutation RegisterMutation($userName: String!, $email: String!, $password: String!) {
            register(userName: $userName, email: $email, password: $password) {
                user{
                    userName
                }
            }
        }
    `

    return (
        <>
            <form id='registerForm' onSubmit={e => {
                e.preventDefault()
            }}>
                <Input
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    type='text'
                    placeholder='Username'
                />
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type='text'
                    placeholder='Email'
                />
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='text'
                    placeholder='Password'
                />
                <Mutation
                    mutation={REGISTER_MUTATION}
                    variables={{ userName, email, password }}
                    onCompleted={data => confirmRegister(data)}
                >
                    {mutation => (
                    <Button color='green' onClick={mutation}>
                        {'register'}
                    </Button>
                    )}
                </Mutation>
            </form>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)