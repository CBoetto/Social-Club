import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addSpaces } from '../../../helpers'

import { Input, Button, TextArea } from 'semantic-ui-react'

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
}

const CreateThread = (props) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const CREATE_THREAD_MUTATION = gql`
        mutation CreateThreadMutation($title: String!, $content: String!, $userId: Int!, $subforumTitle: String!){
            createThread(title: $title, content: $content, userId: $userId, subforumTitle: $subforumTitle){
                title 
                content
            }
        }
        `

    const confirmThread = () => {
        props.history.push(`/subforum/${props.match.params.subForumName}`)
    }

    const subforumTitle = addSpaces(props.match.params.subForumName)
    let userId = null
    if (props.userStore.user){
        userId = parseInt(props.userStore.user.id, 10)
    }

    return (
        <>{
            !props.userStore.user? 
                <Link to={`/subforum/${props.match.params.subForumName}`}>Back</Link>
            :
            <>
                <Link to={`/subforum/${props.match.params.subForumName}`}>Back</Link>
                <form id='createThread_form'>
                    <TextArea
                        id='createThread_title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type='text'
                        placeholder='Thread title.'
                    />
                    <TextArea 
                        id='createPost_input'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        type='text'
                        placeholder='Thread content.'
                    />
                    <Mutation
                        mutation={CREATE_THREAD_MUTATION}
                        variables={{ title, content, userId, subforumTitle }}
                        onCompleted={data => confirmThread(data)}
                    >
                        {(mutation, { loading, error }) => {
                            if (error) return `Error! ${error.message}`
                            return (
                        <>                            
                            {error ? <span>{error}</span> : null}

                            <Link to={`/subforum/${props.subforum}`}>
                                <Button id='createPost_button' color='green' onClick={mutation}>
                                    {'new thread'}
                                </Button>
                            </Link>
                        </>
                        )}}
                    </Mutation>
                </form>
            </>
            }
        </>
    )
}

export default connect(mapStateToProps, null)(CreateThread)