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
function courseFeed(parent, { first, skip }, ctx, info) {
  return ctx.db.query.courses({ skip, first }, info);
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
