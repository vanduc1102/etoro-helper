/* eslint no-undef: "off" */

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'scripts/browser-action-script.js'
  });
});
