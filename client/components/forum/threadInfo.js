import React from 'react';
import { List, Container, Divider, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { removeSpaces, readableDate, mockAvatarAssignment } from '../../../helpers'


const ThreadInfo = (props) => {

    return (
        <>
            <List.Item id='threadInfo' key={props.id}>
                <Container id='threadInfo_left'>
                    <div>
                        <Link to={`/subforum/${removeSpaces(props.param)}/thread/${props.id}`}>
                            {props.title}
                        </Link>
                    </div>
                    <div id='threadInfo_author'>
                        <Label image>
                            <img src={mockAvatarAssignment(props.threadUser)} alt='avatar' />
                            {props.threadUser}
                        </Label>
                    </div>
                </Container>
                <Container id='forum_header_right'>
                    <div id='threadInfo_posts_div'>
                        <p>{props.latestPostUser ? props.postCount : 0}</p>
                    </div>
                    <div id='forum_header_latest_div'>
                        {!props.latestPostUser ? null :
                            <>
                                <div>
                                    <Label image>
                                        <img src={mockAvatarAssignment(props.latestPostUser)} alt='avatar' />
                                        {props.latestPostUser}
                                    </Label> 
                                </div>
                                <div>{readableDate(props.latestPostTime)}</div>
                            </>
                        }
                    </div>
                </Container>
                
                
            </List.Item>
            <Divider />
        </>
    )
}

export default ThreadInfo