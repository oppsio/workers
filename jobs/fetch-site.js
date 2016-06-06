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
