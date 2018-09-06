function newCourseSubsribe(parent, args, context, info) {
  return context.db.subscription.course(
    {
      where: {
        mutation_in: ['CREATED']
      }
    },
    info
  );
}
const newCourse = {
  subscribe: newCourseSubsribe
};
module.exports = {
  newCourse
};
