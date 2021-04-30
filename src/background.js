/* eslint no-undef: "off" */
const ETORO_DOMAIN = 'etoro.com';
chrome.browserAction.onClicked.addListener(function (tab) {
  if (tab.url.includes(ETORO_DOMAIN)) {
    return;
  }
  chrome.tabs.executeScript(
    tab.id,
    {
      file: 'scripts/browser-action-script.js'
    },
    (results) => {
      console.log('background results: ', results);
    }
  );
});
