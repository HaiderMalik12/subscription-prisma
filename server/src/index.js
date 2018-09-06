const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

require('dotenv').config();
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const CourseFeed = require('./resolvers/CourseFeed');
const Subscription = require('./resolvers/Subscription');
console.log(Subscription);
const { forwardTo } = require('prisma-binding');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  CourseFeed,
  Subscription: {
    course: forwardTo('db')
  }
};
// console.log(process.env.PORT);
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
      debug: false // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
});

server.start(() => console.log('Server is running on http://localhost:4000'));
