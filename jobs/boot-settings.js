const kue = require('kue');
const queue = kue.createQueue();

const settings = {
  site: {
    id: '121312',
    code: 'site-code',
    startUrl: '',
    baseUrl: 'http://www.domain.com/',
    pagePattern: '',
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
};

var job = queue.create('settings', settings).save((err) => {
  if (!err) console.log(job.id);
});
