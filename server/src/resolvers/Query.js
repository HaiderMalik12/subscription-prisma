const { getUserId } = require('../utils');
function feed(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: true } }, info);
}
function drafts(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: false } }, info);
}
function post(parent, { id }, ctx, info) {
  return ctx.db.query.post({ where: { id } }, info);
}
async function courseFeed(parent, { first, skip, filter }, ctx, info) {
  const where = filter
  ? {
      OR: [{ name_contains: filter }, { description_contains: filter }]
    }
  : {};
const courses = await ctx.db.query.courses({ where, skip, first }, `{id}`);
  const selectionCount = `{
    aggregate {
      count
    }
  }
    `;
  const coursesConnection = await ctx.db.query.coursesConnection(
    {},
    selectionCount
  );
  return {
    count: coursesConnection.aggregate.count,
    courseIds: courses.map(course => course.id)
  };
}
function course(parent, { id }, ctx, info) {
  return ctx.db.query.course({ where: { id } }, info);
}
function me(parent, args, ctx, info) {
  const id = getUserId(ctx);
  return ctx.db.query.user({ where: { id } }, info);
}

module.exports = {
  feed,
  drafts,
  post,
  courseFeed,
  course,
  me
};
