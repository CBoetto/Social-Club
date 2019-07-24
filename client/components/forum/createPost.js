import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux'

import { Button, TextArea } from 'semantic-ui-react'

import Post from './post'



const CreatePost = (props) => {


    // This state is tied to our post content form and set to the GraphQL server via our
    // createPost mutation.

    const [content, setContent] = useState('');


    // Our createPost mutation that takes our content, userId, and threadId and sends them
    // to the GQL server to create a new post in our database.

    const CREATE_POST_MUTATION = gql`
        mutation CreatePostMutation($content: String!, $userId: Int!, $threadId: Int!) {
            createPost(content: $content, userId: $userId, threadId: $threadId) {
                id
                content
                user {
                    id
                }
            }
        }
    `


    // This logic is used to re render the component once a new post is created.

    const confirmPost = () => {        
        props.refetch()
    }


    // Take our threadId and userId variables that were passed down as props from the
    // Thread component, and put them into variables to use in our mutation.

    const threadId = props.threadId


    // We set the userId only when a user exists on store.  Otherwise the app will crash
    // if there is no user on store and userId is trying to pull an id from a non existent user.

    let userId = Infinity
    if (props.user) {
        userId = parseInt(props.user.id, 10)
    }

    return (
        <>  
            <form 
                id='createPost_form'
                onSubmit={
                    e => {
                        e.preventDefault();
                        setContent('')
                    }
            }>
                <TextArea
                    id='createPost_input'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    type='text'
                    placeholder='Create a new post...'
                />
                <Mutation
                    mutation={CREATE_POST_MUTATION}
                    variables={{ content, userId, threadId }}
                    onCompleted={confirmPost}
                >
                    {mutation => (
                    <Button id='createPost_button' color='green' onClick={mutation}>
                        {'new post'}
                    </Button>
                    )}
                </Mutation>
            </form>

        </>
    )
}

export default CreatePost