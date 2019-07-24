import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
        },
        me: async (parent, args, { models, me }) => {
            return await models.User.findByPk(me.id)
        },
    },

    User: {
        posts: async (user, args, { models })=> {
            return await models.Post.findAll({
                where: {
                    UserId: user.id
                }
            })
        }
    }
}