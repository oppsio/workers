/**
 * Loads the site settings
 */
const process = (queue) => {
  queue.process('settings', function(res, done) {
    fetchSiteLinks(res.data);
    done();
  });
};

/**
 * fetches site links
 */
const fetchSiteLinks = (settings) => {
  console.log(settings);
  console.log('FETCHING LINKS');
};

module.exports = {
  process
};
