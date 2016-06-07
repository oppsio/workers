const Nightmare = require('nightmare');
const config = require('../config');

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
    const urls = [];
    const nightmare = Nightmare({
      show: false
    });

    nightmare
      .useragent(config.useragent)
      .goto('http://localhost:3000/')
      .wait(() => {
        return document.querySelectorAll('a[href^="/job"').length >= 3;
      })
      .evaluate(() => {
        var hrefs = [];
        var links = document.querySelectorAll('a[href^="/job"');
        for (i = 0; i < links.length; i++) {
          hrefs.push(links[i].href);
        }
        return hrefs;
      })
      .end()
      .then((result) => {
        result.forEach((link) => {
          urls.push(link);
        });
        // this.dumpResult(urls);
      })
      .catch((error) => {
        //TODO: use loggly ??
        console.error('Failed to fetch site:', error);
      });
  }

  /**
   * Dump results
   */
  dumpResult(links) {
    links.forEach((link) => {
      const entry = {
        url: link
      };
      this.queue.create(this.Q.OUTBOX, entry).save((err) => {
        if (!err) {
          console.log(`adding ${entry}`);
        }
      });
    });
  }

}

module.exports = FetchSite;
