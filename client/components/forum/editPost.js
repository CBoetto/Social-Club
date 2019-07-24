import React, { useState } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TextArea, Button } from 'semantic-ui-react'

export const DELETE_POST_MUTATION = gql`
    mutation DeletePostMutation($id: Int!) {
        deletePost(id: $id)
    }
`

export const EDIT_POST_MUTATION = gql`
    mutation EditPostMutation($id: Int!, $content: String!){
        editPost(id: $id, content: $content)
    }
`

const EditPost = (props) => {

    const editConfirm = () => {
        props.refetch()
        props.editMode()
    }

    const deleteConfirm = () => {
        props.refetch()
    }

    const [content, setContent] = useState('')

    const id = parseInt(props.postId, 10)
    console.log(typeof id)

    return(
        <>
            <form 
                id='editPost_form'
                onSubmit={
                e => {
                    e.preventDefault()
                }
            }>
                <TextArea
                    id='createPost_input'
                    defaultValue={props.content}
                    onChange={e => setContent(e.target.value)}
                    type='text'
                />
                <Mutation
                    mutation={EDIT_POST_MUTATION}
                    variables={{ id, content }}
                    onCompleted={editConfirm}
                    >
                        {(mutation, { data, loading, error }) => (

                        <Button id='editPost_button' size='mini' color='green' onClick={mutation}>                            
                            {'edit'}                                
                            {loading && <p>Loading...</p>}
                            {error && console.log(error)}
                        </Button>
                        )}
                </Mutation>
            </form>
            <Mutation
            mutation={DELETE_POST_MUTATION}
            variables={{ id }}
            onCompleted={editConfirm}
            >
                {(mutation, { loading, error }) => (
                    <Button size='mini' color='red' onClick={mutation}>
                        {'delete post'}                                
                        {loading && <p>Loading...</p>}
                        {error && console.log(error)}
                    </Button>
                )}
            </Mutation>
        </>
    )
}

export default EditPost