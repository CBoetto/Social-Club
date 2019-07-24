import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { removeSpaces } from '../../../helpers'

const BreadcrumbModule = (props) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Section>
                <Link to="/">
                    Forum
                </Link>
            </Breadcrumb.Section>
            {!props.second ? null :
                <>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section>
                        <Link to={`/subforum/${removeSpaces(props.second)}`}>
                            {props.second}
                        </Link>
                    </Breadcrumb.Section>
                </>
            }
            {!props.third ? null :
                <>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section>
                        <Link to={`/subforum/${props.second}/thread/${props.third}`}>
                            {props.thirdTitle}
                        </Link>
                    </Breadcrumb.Section>
                </>
            }
        </Breadcrumb>
    )
}

export default BreadcrumbModule