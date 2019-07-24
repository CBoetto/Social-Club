import React, { useState } from 'react'
import { List, Button, Container, Divider, Label } from 'semantic-ui-react'
import { readableDate, mockAvatarAssignment } from '../../../helpers'


import EditPost from './editPost';



const Post = (props) => {


    // The delete post button triggers a refetch of our Thread query, so that the thread will
    // immediately reflect the deletion of target post without need for a browser refresh.
    const editPost = () => {
        props.refetch()
    }

    
    // Toggle between edit mode and read mode.

    const [edit, setEdit] = useState(false)

    const editButton = () => {
        setEdit(!edit)
    }


    // If the user's id matches the user id of the post, it will allow you to edit that post.

    const postId = parseInt(props.postUserId, 10)

    const userId = parseInt(props.userId, 10)

    return (                
        <>        
            <List.Item key={props.postId}>
                <Container>
                    <Label image>
                        <img src={mockAvatarAssignment(props.userName)} alt='avatar' />
                        {props.userName}
                    </Label>
                    {!edit ? 
                    <p>{props.content}</p>
                    :
                    <EditPost 
                        content={props.content} 
                        postId={props.postId} 
                        refetch={props.refetch} 
                        userId={userId} 
                        editMode={editButton} 
                    />
                    }
                    {postId !== userId ? null :
                        <Button size='mini' color='blue' onClick={editButton}>
                            {edit ? 'cancel' : 'edit post'}
                        </Button>
                    }
                </Container>
                <Container>
                    <p>{readableDate(props.createdAt)}</p>
                </Container>
                <Divider />
            </List.Item>             
        </>
    )
}

export default Post