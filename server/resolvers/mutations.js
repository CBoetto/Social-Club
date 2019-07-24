import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
    Mutation: {
        login: async (parent, { userName, password }, { models, res }) => {
            const user = await models.User.findOne({ where: { userName }});
            const id = user.dataValues.id;
            const username = user.dataValues.userName

            if (!user) {
                throw new Error('Username not found.')
            }

            let correctPassword = await bcrypt.compare(password, user.dataValues.password)

            if (correctPassword === false) {
                throw new Error("Invalid password.");
            } else {
                let token = ''
                token = jwt.sign(
                    {
                        id: user.dataValues.id,
                        username: user.dataValues.userName
                    },
                    'superdupersecret',
                    {
                        expiresIn: '30d', // token will expire in 30 days
                    },
                )            
                res.cookie('COOKIE', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
                return {
                    userName: username,
                    id
                }
            }


        },
        logout: (parent, args, { req, res }) => {
            res.cookie('COOKIE', '', { expires: new Date(Date.now() - 900000), httpOnly: true })
        },
        register: async (parent, { userName, email, password }, { models, res }) => {
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await models.User.create({
                userName,
                email,
                password: hashedPassword,
                })
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username
                    },
                    'superdupersecret',
                    {
                        expiresIn: '30d', // token will expire in 30 days
                    },
                )
                res.cookie('COOKIE', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            return {
                user
            }
        },
        createPost: async (parent, { content, threadId, userId }, { models, req }) => {

            console.log(req.headers)

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }

            return await models.Post.create({
                content: content,
                UserId: userId,
                ThreadId: threadId
            })
        },
        deletePost: async(parent, { id }, { models, req }) => {

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }

            return await models.Post.destroy({ where: { id }})
        },
        createThread: async (parent, { title, content, subforumTitle, userId }, { models, req }) => {

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }

            const getSubforum = await models.Subforum.findOne({
                where: { title: subforumTitle }
            })

            return await models.Thread.create({
                title: title,
                content: content,
                SubforumId: getSubforum.dataValues.id,
                UserId: userId
            })
        },
        deleteThread: async(parent, { id }, { models, req }) => {

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }

            await models.Thread.destroy({ where: { id }})
            return await models.Post.destroy({ where: { ThreadId: id }})
        },
        editThread: async(parent, { id, title, content }, { models, req }) => {

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }

            return await models.Thread.update({
                title,
                content
              }, {
                where: {
                  id
                }
            })
        },
        editPost: async(parent, {id, content}, { models, req }) => {

            if(req.headers.cookie){
                jwt.verify(req.headers.cookie.slice(7), 'superdupersecret')
            } else {
                throw new Error("Please log in again.");
            }
            
            return await models.Post.update({
                content
            }, {
                where: {
                    id
                }
            })
        },
        updateViews: async(parent, { threadId }, { models }) => {
            const thread = await models.Thread.findOne({ where: { id } })
            let viewCount = thread.dataValues.views
            console.log(viewCount)


        }
    }
}