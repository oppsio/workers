const kue = require('kue');
const queue = kue.createQueue();

const settings = {
  settings: {
    site: {
      id: '123456',
      code: 'localhost',
      startUrl: 'http://localhost:3000/',
      baseUrl: 'http://localhost:3000/',
      linkPattern: 'a[href^="/job"',
      waitForLinks: 3,
      pageTrigger: '',
      pageSelector: '',
      pageSize: '',
      itemPatternFrom: '',
      itemPatternUntil: '',
      itemLength: 0
    },
    selectors: {
      code: '',
      url: '',
      title: '',
      description: '',
      jobType: '',
      travel: '',
      salary: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  }
};

var job = queue.create('settings', settings).save((err) => {
  if (!err) console.log(job.id);
});
