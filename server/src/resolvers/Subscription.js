async function newCourseSubsribe(parent, args, context, info) {
  console.log('newCourseSubscribe');
  try {
    const results = await context.db.subscription.course(
      {
        where: {
          mutation_in: ['CREATED']
        }
      },
      info
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
const newCourse = {
  subscribe: newCourseSubsribe
};
module.exports = {
  newCourse
};
