import userResolvers from './user';
import messageResolvers from './post';
import threadResolvers from './thread'
import mutationResolvers from './mutations'

export default [userResolvers, messageResolvers, threadResolvers, mutationResolvers];