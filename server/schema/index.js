import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './post';
import threadSchema from './thread';
import mutationSchema from './mutations'

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, messageSchema, threadSchema, mutationSchema];