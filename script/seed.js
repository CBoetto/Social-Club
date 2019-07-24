'use strict'

const db = require('../server/db')
const {User, Subforum, Tag, Thread, Post} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', userName: 'SinbadGhost', password: '123'}),
    User.create({email: 'murphy@email.com', userName: 'SuperUrph', password: '123'}),
    User.create({email: 'bumbadumy@email.com', userName: 'Bumb22', password: '123'}),
    User.create({email: 'magnolian@email.com', userName: 'UpperMagnolia', password: '123'}),
    User.create({email: 'fantasysword@email.com', userName: 'BrokenSword', password: '123'}),
  ])

const subforums = await Promise.all([
  Subforum.create({title: 'Art', description: 'Discuss and post art here!'}),
  Subforum.create({title: 'Games', description: 'Discuss games here!'}),
  Subforum.create({title: 'General', description: 'General discussion here.'})
])

const tags = await Promise.all([
  Tag.create({name: 'art'}),
  Tag.create({name: 'general'})
])

const threads = await Promise.all([
  Thread.create({title: 'Your Favorite Retro Game', id: 1, postCount: 1, SubforumId: 1, UserId: 1, content: `What's your favorite retro games?  I've always liked Zelda: Ocarina of Time the most.`}),
  Thread.create({title: 'Yu Suzuki Interview on Game Design', id: 2, postCount: 1, SubforumId: 1, UserId: 5, content: 'The guy behind Space Harrier, Virtua Fighter and Shenmue shares some behind the scenes design ideas here.  https://www.youtube.com/watch?v=fW6cB2rggtU'}),
  Thread.create({title: 'Resident Evil 0 Remake Reviews', id: 3, postCount: 1, SubforumId: 1, UserId: 4, content: `My thoughts:  The best thing Capcom has put out for years.  Stayed totally true to the original game.  I hope they do one for RE2.`}),
  Thread.create({title: 'E3 2019: post-convention thoughts', id: 4, postCount: 1, SubforumId: 1, UserId: 3, content: 'Nintendo was lackluster as usual.  Personally Im most excited about From Softwares new ninja game, what about you guys?'}),
  Thread.create({title: 'Alexandre Diboine Speed-Paint', id: 5, postCount: 1, SubforumId: 2, UserId: 1, content: 'Thought you guys might enjoy this: https://www.youtube.com/watch?v=VVrbktxfGYs&list=PL7JM77xY3a39UyMgMWwaFEUgdGv3lFxm8&index=4'}),
  Thread.create({title: 'Books on Art History', id: 6, postCount: 1, SubforumId: 2, UserId: 4, content: 'Do any of you have good recommendations to read about art history?'}),
  Thread.create({title: 'I like to drawl...', id: 7, postCount: 1, SubforumId: 2, UserId: 2, content: 'Hello.  I like it.'}),
  Thread.create({title: 'Whens the next movie night?', id: 8, postCount: 1, SubforumId: 3, UserId:4, content: 'Last one was so fun, when will we do it again?'}),
  Thread.create({title: 'Good morning everyone!', id: 9, postCount: 1, SubforumId: 3, UserId: 5, content: 'Hello lets talk about good morning.'}),
  Thread.create({title: 'What do you think about this?', id: 10, postCount: 1, SubforumId: 3, UserId: 1, content: `So, what do you think about it?`}),
  Thread.create({title: 'Bad Joke Thread', id: 11, postCount: 1, SubforumId: 3, UserId: 3, content: `What did the fish say when he swam into the wall? ... 'Im a fish.'`}),
])

  const posts = await Promise.all([
    Post.create({content: 'I never had a Nintendo 64.  Playstation 2 was awesome though, I used to love Vandal Hearts.', ThreadId: 1, UserId: 1}),
    Post.create({content: 'I have never heard of that one before, Ill try it out.', ThreadId: 1, UserId: 2}),
    Post.create({content: 'All time great game designer, thanks for the link.', ThreadId: 2, UserId: 3}),
    Post.create({content: 'It was scary, I had to turn the lights on and bring my dogs in the room.', ThreadId: 3, UserId: 1}),
    Post.create({content: 'RE was one of my favorite series and they really lived up to expectations, surprisingly.', ThreadId: 3, UserId: 5}),
    Post.create({content: `I thought Nintendo did great.  Breath of the Wild 2 looks amazing!`, ThreadId: 4, UserId: 1}),
    Post.create({content: 'Never heard of this guy, but hes really good!', ThreadId: 5, UserId: 5}),
    Post.create({content: 'I could never draw like that.', ThreadId: 5, UserId: 4}),
    Post.create({content: 'The one I can recommend is The Judgment of Paris.  Its about the birth of Impressionism... highly recommended!', ThreadId: 6, UserId: 2}),
    Post.create({content: 'I like too.', ThreadId: 7, UserId: 3}),
    Post.create({content: 'We do it every Wednesday.  This next one is a detective story.', ThreadId: 8, UserId: 1}),
    Post.create({content: 'Better be The Great Mouse Detective...', ThreadId: 8, UserId: 4}),
    Post.create({content: 'Guten Morgan.', ThreadId: 9, UserId: 5}),
    Post.create({content: 'WHATS SO GOOD ABOUT IT!??!?', ThreadId: 9, UserId: 2}),
    Post.create({content: 'I think about it sometimes.', ThreadId: 10, UserId: 5}),
    Post.create({content: 'What do you call a fish with no eyes?  A blind fish.', ThreadId: 11, UserId: 3}),
    Post.create({content: 'What is Forrest Gumps email password?  Password!', ThreadId: 6, UserId: 2}),

  ])

  console.log(`seeded ${users.length} users`)
  console.log( `seeded ${subforums.length} subforums`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
