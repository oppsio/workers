var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true
})

/**
 * Fetch Site Job
 */
class FetchSite {

  get Q() {
    return {
      INBOX: 'settings',
      OUTBOX: 'links',
    };
  }

  constructor(queue) {
    this.queue = queue;
  }

  /**
   * Loads the site settings
   */
  process() {
    const self = this;
    this.queue.process(this.Q.INBOX, (res, done) => {
      self.fetchSiteLinks(res.data);
      done();
    });
  }

  /**
   * fetches site links
   */
  fetchSiteLinks(settings) {

    nightmare
      .goto('http://localhost:3000/')
      .wait(function() {
        return document.querySelectorAll('a[href^="/job"').length >= 3;
      })
      .evaluate(function() {
        var hrefs = [];
        var links = document.querySelectorAll('a[href^="/job"');
        for (i = 0; i < links.length; i++) {
          hrefs.push(links[i].href);
        }
        return hrefs;
      })
      .end()
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.error('Failed to fetch site:', error);
      });

    console.log(settings);
    console.log('FETCHING LINKS');
    console.log(this.Q.INBOX);
    console.log(this.Q.OUTBOX);
    const links = [{
      url: 'aa'
    }, {
      url: 'asdas',
    }];
    this.dumpResult(links);
  }

  /**
   * Dump results
   */
  dumpResult(links) {
    links.forEach((link) => {
      console.log(link);
      this.queue.create(this.Q.OUTBOX, link).save((err) => {
        if (!err) {
          console.log();
        }
      });
    });
  }

}

module.exports = FetchSite;
