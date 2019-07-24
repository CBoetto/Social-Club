export default {
    Query: {
        posts: async (parent, args, { models }) => {
            return await models.Post.findAll();

        },
        post: async (parent, { id }, { models }) => {
            return await models.Post.findByPk(id)
        },
        subforums: async (parent, args, { models }) => {
            return await models.Subforum.findAll({
                include: [{model: models.Thread}]
            })
        }
    },


    Post: {
        user: async (post, args, { models }) => {
            return await models.User.findByPk(post.UserId)
        }
    },
}