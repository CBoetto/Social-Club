import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import { Link} from 'react-router-dom'
import { removeSpaces, subforumIcon, threadInfoRender } from '../../../helpers'
import { List, Header, Icon, Breadcrumb, Container, Divider } from 'semantic-ui-react'

import ThreadInfo from './threadInfo'
import BreadcrumbModule from './breadcrumb'

const SUBFORUM_QUERY = gql`
    query subforumList{
        subforums{
            id
            title
            description
            Threads{
                id
                title
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
    }
`

const latestThree = (array) => {
    return array.sort((a, b) => (b.id > a.id) ? 1 : -1).slice(0, 3)
}

const Forum = (props) => {

    return(
        <>
            <BreadcrumbModule />
            <Query 
                query={SUBFORUM_QUERY}
                fetchPolicy="no-cache"
            >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`
                        console.log(data)
                    return (
                        <>
                            <List>
                                {data.subforums.map( subforum => {
                                    {console.log(subforum)}
                                    return (
                                        <List.Item key={subforum.id}>
                                            <Link to={`/subforum/${removeSpaces(subforum.title)}`}>                                                
                                                <Header sub block color='blue' id='subforum_header'>
                                                    <List.Content id='forum_header'>
                                                        <div id='forum_header_left'>
                                                            {subforumIcon(subforum.title)}
                                                            <p>{subforum.title}</p>
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
                                            </Link>
                                            <List>    
                                                {latestThree(subforum.Threads).map( thread => {
                                                    return(
                                                        threadInfoRender(thread, subforum)
                                                    )
                                                })}
                                            </List>
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </>
                    )
                }
                }
            </Query>
        </>
    );
}

export default Forum