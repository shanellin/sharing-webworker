module.exports = app => {
  const worker = require('./worker');
  app.use(/^\/$/, worker.index);
  const turtleRabbit = require('./worker');
  app.use('/race', worker.turtleRabbit);
};