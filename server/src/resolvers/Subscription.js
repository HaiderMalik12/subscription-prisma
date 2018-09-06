const { forwardTo } = require('prisma-binding');
module.exports = {
  course: forwardTo('db')
};
