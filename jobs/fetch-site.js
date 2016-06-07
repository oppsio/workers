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
    const site = settings.settings.site;
    const nightmare = Nightmare({
      show: false
    });
    console.log(`FetchSite: [${site.code}] processing...`);

    nightmare
      .useragent(config.useragent)
      .goto(site.startUrl);

    //for (var i = 10; i >= 0; i--) {
      nightmare
        .wait((linkPattern, waitForLinks) => { // arguments passed as aditional arg below
          return document.querySelectorAll(linkPattern).length >= waitForLinks;
        }, site.linkPattern, site.waitForLinks) // passing arguments to evaluate()
        .evaluate((linkPattern) => { // linkPattern passed as aditional arg below
          var hrefs = [];
          var links = document.querySelectorAll(linkPattern);
          for (i = 0; i < links.length; i++) {
            hrefs.push(links[i].href);
          }
          return hrefs;
        }, site.linkPattern); // passing argument to evaluate()
        // .click('#next');
    //}

    nightmare
      .end()
      .then((result) => {
        if (result) {
          result.forEach((link) => {
            urls.push(link);
          });
          console.log(`FetchSite: [${site.code}] extracted ${result.length} links`);
          console.log(result);
          // this.dumpResult(urls);
        }
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
