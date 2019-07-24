export default {
    Query: {
        subforums: async (parent, args, { models }) => {
            return await models.Subforum.findAll({
                include: [{
                    model: models.Thread,
                    include: [{
                        model: models.Post
                    }]
                }]
            })
        },
        threads: async (parent, { subforumName }, { models }) => {
            const getSubforum = await models.Subforum.findOne({
                where: { title: subforumName }
            })

            return await models.Thread.findAll({
                where: { SubforumId: getSubforum.dataValues.id },
                include: [
                    {
                        model: models.Post
                    }
                ]
            })
        },
        thread: async (parent, { threadId }, { models }) => {

            const returnPost = await models.Post.findAll({
                where: { ThreadId: threadId }
            })
            return returnPost
        },
        thread:  async (parent, { threadId }, { models }) => {
            return await models.Thread.findByPk(threadId, {
                include: [
                    {
                    model: models.Post,
                    },
                ],
            });
        }
    },
    Thread: {
        user: async (post, args, { models }) => {
            return await models.User.findByPk(post.UserId)
        }
    }
}