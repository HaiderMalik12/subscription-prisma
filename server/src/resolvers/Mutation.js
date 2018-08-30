const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createDraft(parent, { title, text }, ctx, info) {
  return ctx.db.mutation.createPost(
    {
      data: {
        title,
        text
      }
    },
    info
  );
}
function createCourse(parent, { name, description }, ctx, info) {
  return ctx.db.mutation.createCourse(
    {
      data: {
        name,
        description
      }
    },
    info
  );
}
function updateCourse(parent, { id, name, description }, ctx, info) {
  return ctx.db.mutation.updateCourse(
    {
      data: { name, description },
      where: { id: id }
    },
    info
  );
}
function deletePost(parent, { id }, ctx, info) {
  return ctx.db.mutation.deletePost({ where: { id } }, info);
}
function deleteCourse(parent, { id }, ctx, info) {
  return ctx.db.mutation.deleteCourse({ where: { id } }, info);
}
function publish(parent, { id }, ctx, info) {
  return ctx.db.mutation.updatePost(
    {
      where: { id },
      data: { isPublished: true }
    },
    info
  );
}
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password }
    },
    `{ id }`
  );
  const token = jwt.sign(
    { userId: user.id },
    process.env.APP_SECRET || 'AWSNBCCV'
  );
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user(
    { where: { email: args.email } },
    ` { id password } `
  );
  if (!user) {
    throw new Error('No such user found');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, 'AWSNBCCV');
  return {
    token,
    user
  };
}

module.exports = {
  createDraft,
  createCourse,
  updateCourse,
  deletePost,
  deleteCourse,
  publish,
  signup,
  login
};
