import React, { useState } from 'react'
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { TextArea, Button } from 'semantic-ui-react'
import { DELETE_POST_MUTATION } from './editPost';



const DELETE_THREAD_MUTATION = gql`
    mutation DeleteThreadMutation($id: Int!) {
        deleteThread(id: $id)
    }
`

const EDIT_THREAD_MUTATION = gql`
    mutation EditThreadMutation($id: Int!, $title: String!, $content: String!){
        editThread(id: $id, title: $title, content: $content)
    }
`

const EditThread = (props) => {

    const [deleted, setDeleted] = useState(false)

    const confirmDeleted = () => {
        setDeleted(true)
    }

    const [title, setTitle] = useState(props.title)
    const [content, setContent] = useState(props.content)

    const confirmEdit = () => {
        props.editButton()
        props.refetch()
    }

    const id = parseInt(props.threadId, 10)

    return(
        <>
        {console.log(props)}
            <form onSubmit={e => {
                e.preventDefault();
                props.eventButton
            }}>
                <TextArea
                    id='createThread_title'
                    defaultValue={props.title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                />
                <TextArea
                    id='createPost_input'
                    defaultValue={props.content}
                    onChange={e => setContent(e.target.value)}
                    type='text'
                />
                <Mutation
                    mutation={EDIT_THREAD_MUTATION}
                    variables={{ id, title, content }}
                    onCompleted={confirmEdit}
                    >
                        {(mutation, { loading, error }) => (
                                <Button size='mini' color='green' id='editPost_button' onClick={mutation}>
                                    {'edit'}                                
                                    {loading && <p>Loading...</p>}
                                    {error && console.log(error)}
                                </Button>
                        )}
                </Mutation>
            </form>
            { deleted === true ?
                <div>
                    {'post deleted'}                                
                </div>
            :
                <Mutation
                mutation={DELETE_THREAD_MUTATION}
                variables={{ id }}
                onCompleted={confirmDeleted}
                >
                    {(mutation, { loading, error }) => (
                        <Link to={`/subforum/${props.subforum}`}>
                            <Button size='mini' color='red' onClick={mutation}>
                                    {'delete post'}                                
                                    {loading && <p>Loading...</p>}
                                    {error && console.log(error)}
                            </Button>                  
                        </Link>

                    )}
                </Mutation>
            }


        </>
    )
}

export default EditThread