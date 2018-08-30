const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info);
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: false } }, info);
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id } }, info);
    },
    courseFeed(parent, args, ctx, info) {
      return ctx.db.query.courses({ where: { isPublished: false } }, info);
    },
    course(parent, { id }, ctx, info) {
      return ctx.db.query.course({ where: { id } }, info);
    }
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            text
          }
        },
        info
      );
    },
    createCourse(parent, { name, description }, ctx, info) {
      return ctx.db.mutation.createCourse(
        {
          data: {
            name,
            description
          }
        },
        info
      );
    },
    updateCourse(parent, { id, name, description }, ctx, info) {
      return ctx.db.mutation.updateCourse(
        {
          data: { name, description },
          where: { id: id }
        },
        info
      );
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info);
    },
    deleteCourse(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteCourse({ where: { id } }, info);
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true }
        },
        info
      );
    }
  }
};
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'https://eu1.prisma.sh/haidermalik504/prisam-db/dev', // the endpoint of the Prisma API
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
});

server.start(() => console.log('Server is running on http://localhost:4000'));
