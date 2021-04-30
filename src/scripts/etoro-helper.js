'use strict';

(() => {
  function getOptions() {
    return {
      refreshTime: 5000
    };
  }

  function initWatchListView() {
    try {
      let mainListViewElement = document.querySelector('[automation-id="watchlist-watchlist-sub-view-list"]');
      let isListView =
        mainListViewElement &&
        mainListViewElement.className.includes('list-view');
      if (isListView) {
        let tabletRowEls = mainListViewElement.querySelectorAll('[automation-id="watchlist-list-instruments-list"]');
        tabletRowEls.forEach((rowElement) => {
          let tableInfoEl = rowElement.querySelector('[automation-id="watchlist-item-grid-instrument-buy-sell-container"]');
          let sellBtnEl = tableInfoEl.querySelector('[automation-id="buy-sell-button-container-sell"]');
          let buyBtnEl = tableInfoEl.querySelector('[automation-id="buy-sell-button-container-buy"]');
          if (!sellBtnEl || !buyBtnEl) {
            return;
          }
          let sellPrice = sellBtnEl
            .querySelector('[automation-id="buy-sell-button-rate-value"]')
            .textContent.trim();
          let buyPrice = buyBtnEl
            .querySelector('[automation-id="buy-sell-button-rate-value"]')
            .textContent.trim();
          let spreadPrice = Number(buyPrice) - Number(sellPrice);
          let spreadPercent = (spreadPrice / sellPrice) * 100;
          addSpreadTextElement(rowElement, spreadPrice, spreadPercent);
        });
      } else {
        let cardElementList = document.querySelectorAll('[automation-id="watchlist-grid-instruments-list"]');
        cardElementList.forEach((cardElement) => {
          let btnSellEl = cardElement.querySelector('[automation-id="buy-sell-button-container-sell"]');
          let btnBuyEl = cardElement.querySelector('[automation-id="buy-sell-button-container-buy"]');
          if (!btnBuyEl || !btnSellEl) {
            return;
          }
          let sellPrice = btnSellEl
            .querySelector('[automation-id="buy-sell-button-rate-value"]')
            .textContent.trim();
          let buyPrice = btnBuyEl
            .querySelector('[automation-id="buy-sell-button-rate-value"]')
            .textContent.trim();
          // let marketHeadEl = cardElement.querySelector('.market-card-head');
          let spreadPrice = Number(buyPrice) - Number(sellPrice);
          let spreadPercent = (spreadPrice / sellPrice) * 100;
          addSpreadTextElement(cardElement, spreadPrice, spreadPercent);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function addSpreadTextElement(parentElement, spreadPrice, spreadPercent) {
    let text =
      '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
    let clsHelperPrice = 'etoro-helper-price';
    let priceNodeEl = parentElement.querySelector('.' + clsHelperPrice);
    if (!priceNodeEl) {
      let priceNodeEl = document.createElement('span');
      priceNodeEl.className += clsHelperPrice;
      let node = document.createTextNode(text);
      priceNodeEl.appendChild(node);
      parentElement.appendChild(priceNodeEl);
    } else if (priceNodeEl.innerHTML !== text) {
      let needUpdateCls =
        priceNodeEl.innerHTML.trim() > text
          ? 'need-update-up'
          : 'need-update-down';
      priceNodeEl.innerHTML = text;
      priceNodeEl.classList.add(needUpdateCls);
      setTimeout(
        () => {
          priceNodeEl.classList.remove(needUpdateCls);
        },
        1000,
        priceNodeEl
      );
    }
  }

  function initialPortfolioOverview() {
    try {
      let portfolioEl = document.querySelector('.main-app-view .p-portfolio .portfolio-overview');
      let tabletRowEls = portfolioEl.querySelectorAll('.ui-table-row-container');
      tabletRowEls.forEach((el, index) => {
        if (el.className.indexOf('empty') !== -1) {
          return;
        }
        let cellNameEl = el.querySelector('.ui-table-static-cell');
        let sellBtnEl = el.querySelector('.etoro-sell-button');
        let buyBtnEl = el.querySelector('.etoro-buy-button');
        if (!sellBtnEl || !buyBtnEl) {
          return;
        }
        let sellPrice = sellBtnEl
          .querySelector('.etoro-price-value')
          .textContent.trim();
        let buyPrice = buyBtnEl
          .querySelector('.etoro-price-value')
          .textContent.trim();
        let spreadPrice = Number(buyPrice) - Number(sellPrice);
        let spreadPercent = (spreadPrice / sellPrice) * 100;
        let spreadAndPrice =
          '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
        createSpanNode(cellNameEl, spreadAndPrice);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function toFixed(number) {
    let result;
    if (number > 1000) {
      result = Math.round(number);
    } else if (number > 100) {
      result = number.toFixed(1);
    } else if (number > 10) {
      result = number.toFixed(2);
    } else {
      result =
        Math.floor(number * 1000) === 0 ? number.toFixed(5) : number.toFixed(3);
    }
    return result;
  }

  function updatePrice() {
    const href = window.location.href;
    if (href.indexOf('/watchlists') > 0) {
      initWatchListView();
    } else if (href.indexOf('/portfolio') > 0) {
      initialPortfolioOverview();
    }
  }

  function start() {
    let options = getOptions();
    setInterval(updatePrice, options.refreshTime);
  }

  start();
})();
