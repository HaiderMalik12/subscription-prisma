function subscribeToNewPost(_, args, ctx, info) {
  return ctx.db.subscription.course(
    {
      where: {
        mutation_in: ['CREATED']
      }
    },
    info
  );
}
const newCourse = {
  subscribe: subscribeToNewPost
};
module.exports = {
  newCourse
};
