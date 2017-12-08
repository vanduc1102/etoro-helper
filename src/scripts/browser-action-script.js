'use strict';

main();

function main() {
  let currentUrl = window.location.href;
  if (currentUrl.indexOf('etoro.com') === -1 || !currentUrl) {
    window.location.href = 'https://www.etoro.com/watchlists';
  }
}

