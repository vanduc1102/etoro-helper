'use strict';

(function () {
  let portfolioEl;
  let marketEl;
  function getOptions() {
    return {
      refreshTime: 10000
    };
  }

  function initWatchListView() {
    let tabletRowEls = marketEl.querySelectorAll('.table-body .table-row');
    tabletRowEls.forEach((el, index) => {
      if (el.className.indexOf('empty') !== -1) {
        return;
      }
      let cellNameEl = el.querySelector('.table-name-cell');
      let tableInfoEl = el.querySelector('.table-info');
      let sellBtnEl = tableInfoEl.querySelector('.etoro-sell-button');
      let sellPrice = sellBtnEl.querySelector('.etoro-price-value').textContent.trim();
      let buyBtnEl = tableInfoEl.querySelector('.etoro-buy-button');
      let buyPrice = buyBtnEl.querySelector('.etoro-price-value').textContent.trim();
      let spreadPrice = Number(buyPrice) - Number(sellPrice);
      let spreadPercent = (spreadPrice / buyPrice) * 100;
      let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
      createSpanNode(cellNameEl, spreadAndPrice);
    });
  }

  function createSpanNode(parent, text) {
    let clsHelperPrice = 'etoro-helper-price';
    let priceNodeEl = parent.querySelector('.' + clsHelperPrice);
    if (!priceNodeEl) {
      let priceNodeEl = document.createElement('span');
      priceNodeEl.className += clsHelperPrice;
      let node = document.createTextNode(text);
      priceNodeEl.appendChild(node);
      parent.appendChild(priceNodeEl);
    } else if (priceNodeEl.innerHTML !== text) {
      priceNodeEl.innerHTML = text;
      let needUpdateCls = 'need-update';
      if (priceNodeEl.className.indexOf(needUpdateCls) === -1) {
        priceNodeEl.classList.add(needUpdateCls);
        setTimeout(() =>{
          priceNodeEl.classList.remove(needUpdateCls);
        }, 1000, priceNodeEl);
      }
    }
  }

  function initialPortfolioOverview() {
    let tabletRowEls = portfolioEl.querySelectorAll('.ui-table-row-container');
    tabletRowEls.forEach((el, index) => {
      if (el.className.indexOf('empty') !== -1) {
        return;
      }
      let cellNameEl = el.querySelector('.ui-table-static-cell');
      let sellBtnEl = el.querySelector('.etoro-sell-button');
      let sellPrice = sellBtnEl.querySelector('.etoro-price-value').textContent.trim();
      let buyBtnEl = el.querySelector('.etoro-buy-button');
      let buyPrice = buyBtnEl.querySelector('.etoro-price-value').textContent.trim();
      let spreadPrice = Number(buyPrice) - Number(sellPrice);
      let spreadPercent = (spreadPrice / buyPrice) * 100;
      let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
      createSpanNode(cellNameEl, spreadAndPrice);
    });
  }

  function toFixed(number) {
    return Math.floor(number * 1000) === 0 ? number.toFixed(5) : number.toFixed(3);
  }

  function updatePrice() {
    portfolioEl = document.querySelector('.main-app-view .p-portfolio .portfolio-overview');
    marketEl = document.querySelector('.table-body.market');
    if (marketEl) {
      initWatchListView();
    } else if (portfolioEl) {
      initialPortfolioOverview();
    }
  }
  function start() {
    let options = getOptions();
    setInterval(updatePrice, options.refreshTime);
  }
  start();
}());
