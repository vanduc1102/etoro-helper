'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.getElementById('myRange');
  var amountCups = document.getElementById('amount-cup');
  var btnSend = document.getElementById('btn-send');
  var linkReview = document.getElementById('review');
  var bottlesContainer = document.getElementById('bottles');

  init();

  slider.oninput = function () {
    setAmount(this.value);
  };

  btnSend.onclick = function () {
    let url = 'https://www.paypal.me/vanducld/' + getValue();
    window.open(url, '_blank').focus();
  };

  linkReview.onclick = function (e) {
    e.preventDefault();
    let url = 'https://chrome.google.com/webstore/detail/etoro-helper/pop' +
    'plbdeejejapdocebnmkkhfcbkbdne/reviews?hl=' + getLanguage();
    window.open(url, '_blank').focus();
  };

  function setAmount(amount) {
    let addOrRemove = amountCups.innerHTML < amount;
    amountCups.innerHTML = amount;
  }

  function init() {
    setAmount(slider.value);
  }
  function getValue() {
    return slider.value || 0;
  }

  function getLanguage() {
    var lng = window.navigator.userLanguage || window.navigator.language;
    return lng.split('-')[0] || 'en';
  }
});
