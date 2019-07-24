import React from 'react'
import { Header, List, Container, Divider, Label } from 'semantic-ui-react'
import { mockAvatarAssignment } from '../../../helpers'

import EditThread from './editThread'

const FirstPost = (props) => {
    
    return(
        <>
            <Header id='header_block' sub block color='blue'>{props.title}</Header>
            {parseInt(props.threadUserId, 10) !== props.userId ? null :
                <>
                    {/* <EditThread threadId={props.threadId} subforum={props.subforum} />                                 */}
                    {/* <button onClick={props.editButton}>Edit Thread</button> */}
                </>
            }
            <List.Item>
                <Label image>
                    <img src={mockAvatarAssignment(props.userName)} alt='avatar' />
                    {props.userName}
                </Label>
                <Container>
                    {props.content}
                </Container>
                <Divider />
            </List.Item>
        </>
    )
}

export default FirstPost