
const kue = require('kue');
const queue = kue.createQueue();

const FetchSite = require('./fetch-site');

// Process all workers
new FetchSite(queue).process();
