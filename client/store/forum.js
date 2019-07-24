

/**
 * ACTION TYPES
 */
const SET_SUBFORUM = 'SET_SUBFORUM';
const SET_THREAD = 'SET_THREAD';
const SET_POST = 'SET_POST';
const REMOVE_FORUM = 'REMOVE_FORUM';

/**
 * INITIAL STATE
 */
const defaultForum = {}

/**
 * ACTION CREATORS
 */
export const setSubforum = subforum => ({type: SET_SUBFORUM, subforum})
export const setThread = thread => ({type: SET_THREAD, thread})
export const setPost = post => ({type: SET_POST, post})
export const removeForum = () => ({type: REMOVE_FORUM})

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function(state = defaultForum, action) {
    switch (action.type) {
        case SET_SUBFORUM:
            return {subforum: action.subforum}
        case SET_THREAD:
            return {thread: action.thread}
        case SET_SUBFORUM:
            return {post: action.post}
        case REMOVE_FORUM:
            return defaultForum
        default:
            return state
    }
}
