import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import { removeSpaces } from '../../../helpers'
import { Header, List, Icon, Breadcrumb, Button } from 'semantic-ui-react'


import CreatePost from './createPost';
import Post from './post'
import EditThread from './editThread'
import FirstPost from './firstPost'
import BreadcrumbModule from './breadcrumb'


// Put the user information on the Redux store into this component's props.

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
};


// Our GQL query for getting all the posts in this thread.

export const THREAD_QUERY = gql`
    query postList($threadId: Int!){
        thread(threadId: $threadId){
            id
            title
            content
            user{
                id
                userName
            }
            Posts{
                id
                content
                createdAt
                user {
                    id
                    userName
                }
            }
        }
    }
`

const Thread = (props) => {



    // Our logic for getting the user ID on state.  We use this to conditionally render
    // the createPost component.  We also will pass the userID to the createPost component.

    const [userId, setUserId] = useState(0)

    useEffect (() => {
        if(props.userStore.user){
            setUserId(parseInt(props.userStore.user.id))
        };
        console.log(props.match.params)
    }, [props.userStore])


    // Get the thread ID from the Match object.  We will pass this to the createPost component.

    const threadId = parseInt(props.match.params.threadId, 10)

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const editButton = () => {
        setEdit(!edit)
    }

    
    return (
        <>

            <Query 
            fetchPolicy="no-cache"
            query={THREAD_QUERY}
            variables={{ threadId }}
            >
            {({ loading, error, data, refetch }) => {
                console.log(data)
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`
                return (
                    <>            
                        <BreadcrumbModule
                            second={Object.entries(props.match.params)[0][1]}
                            third={Object.entries(props.match.params)[1][1]}
                            thirdTitle={data.thread.title}
                        />
                        {edit === false ?
                            <FirstPost 
                                userName={data.thread.user.userName}
                                title={data.thread.title}
                                content={data.thread.content}
                                threadId={threadId} 
                                subforum={props.match.params.subForumName} 
                                editButton={editButton} 
                                threadUserId={data.thread.user.id}
                                userId={userId}
                            />
                        :
                            <EditThread 
                                title={data.thread.title}
                                content={data.thread.content}
                                threadId={threadId} 
                                subforum={props.match.params.subForumName} 
                                editButton={editButton} 
                                refetch={refetch} 
                                history={props.history}
                            />
                        }
                        {parseInt(data.thread.user.id, 10) === userId ?
                            <Button color='blue' size='mini' onClick={editButton}>{edit? 'cancel' : 'edit thread'}</Button>
                        : null}
                        {data.thread.Posts.sort((a, b) => (a.id > b.id) ? 1 : -1).map(post => {
                            {console.log('the post', post)}
                            return (
                                <Post 
                                content={post.content} 
                                key={post.id} 
                                userId={userId} 
                                refetch={refetch}
                                userName={post.user.userName} 
                                createdAt={post.createdAt}
                                postUserId={post.user.id}
                                postId={post.id}
                                />
                            )
                        })}      

                        { userId === 0 ? null :
                            <CreatePost threadId={threadId} user={props.userStore.user} refetch={refetch} subforum={props.match.params.subForumName} />
                        }
                    </>
                )
                }}
            </Query>

    </>
    )
}

export default connect(mapStateToProps, null)(Thread)