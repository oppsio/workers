var Nightmare = require('nightmare');
var vo = require('vo');

vo(run)(function(err, result) {
  if (err) throw err;
});

function* run() {
  var nightmare = Nightmare({
      show: true
    }),
    MAX_PAGE = 10,
    currentPage = 0,
    nextExists = true,
    links = [];

  yield nightmare
    .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36')
    .goto('https://www.yahoo.com')
    .type('#uh-search-box', 'github nightmare')
    .click('#uh-search-button')
    .wait(3000);

  nextExists = yield nightmare.visible('.next');
  while (nextExists && currentPage < MAX_PAGE) {
    links.push(yield nightmare
      .evaluate(function() {
        var links = document.querySelectorAll('ol.searchCenterMiddle a');
        return links[0].href;
      }));

    yield nightmare
      .click('.next')
      .wait('body');

    currentPage++;
    nextExists = yield nightmare.visible('.next');
  }

  console.dir(links);
  yield nightmare.end();
}
