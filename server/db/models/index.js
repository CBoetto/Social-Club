const User = require('./user')
const Post = require('./post')
const Subforum = require('./subforum')
const Thread = require('./thread')
const Tag = require('./tag')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Post.belongsTo(Thread)
Thread.hasMany(Post)
Thread.belongsTo(Subforum)
Subforum.hasMany(Thread)
User.hasMany(Post)
Post.belongsTo(User)
User.hasMany(Thread)
Thread.belongsTo(User)
Thread.belongsToMany(Tag, {through: 'Thread_Tag'})
Tag.belongsToMany(Thread, {through: 'Thread_Tag'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Post,
  Subforum,
  Thread,
  Tag
}
