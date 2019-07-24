import React from 'react'

const PostContent = (props) => {


    return(
        <>
            {parseInt(props.data.post.user.id, 10) !== props.userId ? null :
                <>
                    <button onClick={props.editButton}>Edit Post</button>
                </>
            }
            <ul>
                <li>{props.data.post.content}</li>
            </ul>
        </>
    )
}

export default PostContent