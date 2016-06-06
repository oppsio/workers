
const kue = require('kue');
const queue = kue.createQueue();

// Call all workers
require('./fetch-site').process(queue);
