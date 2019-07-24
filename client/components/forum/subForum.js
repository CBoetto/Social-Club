import React from 'react'
import { Link } from 'react-router-dom'
import { removeSpaces, addSpaces, subforumIcon, threadInfoRender } from '../../../helpers'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import {setThread} from '../../store/forum'
import {connect} from 'react-redux'
import { Header, List, Icon, Button, Container, Divider } from 'semantic-ui-react'

import ThreadInfo from './threadInfo'
import BreadcrumbModule from './breadcrumb'


const THREADS_QUERY = gql`
    query threadList($subforumName: String!){
        threads(subforumName: $subforumName){
            title
            id
            createdAt
            user {
                userName
            }
            Posts {
                createdAt
                user {
                    userName
                }
            }
        }
    }
`

const mapStateToProps = state => {
    return {
        forumStore: state.forumStore,
        userStore: state.userStore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setThread: thread => dispatch(setThread(thread)),
    }
}

const latestFirst = (array) => {
    return array.sort((a, b) => (b.id > a.id) ? 1 : -1)
}

const SubForum = (props) => {

const subforumName = addSpaces(props.match.params.subForumName)

    return (
        <>
            <Query
                fetchPolicy="no-cache"
                query={THREADS_QUERY}
                variables={{ subforumName }}
            >
            {({ loading, error, data, refetch }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`
                return (
                    <>
                        <BreadcrumbModule 
                            second={Object.entries(props.match.params)[0][1]}
                        />
                        <Header sub block color='blue'>
                            <List.Content id='forum_header'>
                                <div id='forum_header_left'>
                                    {subforumIcon(subforumName)}
                                    <p>{subforumName}</p>
                                </div>
                                <div id='forum_header_right'>
                                    <div id='forum_header_posts_div'>
                                        <p>posts</p>
                                    </div>
                                    <div id='forum_header_latest_div'>
                                        <p>latest post</p>
                                    </div>
                                </div>
                            </List.Content> 
                        </Header>
                        <List>
                            {latestFirst(data.threads).map( thread => {
                                return (
                                    threadInfoRender(thread, {title: props.match.params.subForumName})
                                )
                            })}
                        </List>
                    </>
                )
            }}
            </Query>
            {!props.userStore.user ? null :
                <Link to={`/subforum/${removeSpaces(props.match.params.subForumName)}/newThread`}>
                    <Button color='green'>
                        Create Thread
                    </Button>
                </Link>
            }
            
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubForum)