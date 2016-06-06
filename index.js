const kue = require('kue');
const queue = kue.createQueue();

console.log('hello dude');

var job = queue.create('email', {
  title: 'email title',
  user: 1,
  frames: 200
}).save((err) => {
  if (!err) console.log(job.id);
});

job.on('complete', (result) => {
  console.log('Job completed with data ', result);

}).on('failed attempt', (errorMessage, doneAttempts) => {
  console.log('Job failed');

}).on('failed', (errorMessage) => {
  console.log('Job failed');

}).on('progress', (progress, data) => {
  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
});

queue.process('email', (job, done) => {
  email(job.data.title, done);
});

const email = (title, done) => {
  // email send stuff...
  console.log(title);
  done();
};
