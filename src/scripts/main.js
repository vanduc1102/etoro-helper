'use strict';

(function () {
  function getOptions() {
    return {
      refreshTime: 10000
    };
  }

  function initWatchListView() {
    try {
      let mainContentEl = document.querySelector('.main-app-view .main-content');
      let isListView = mainContentEl.className.indexOf('list-view') > 0;
      if (isListView) {
        let marketEl = mainContentEl.querySelector('.table-body.market');
        let tabletRowEls = marketEl.querySelectorAll('.table-body .table-row');
        tabletRowEls.forEach((el, index) => {
          if (el.className.indexOf('empty') !== -1) {
            return;
          }
          let cellNameEl = el.querySelector('.table-name-cell');
          let tableInfoEl = el.querySelector('.table-info');
          let sellBtnEl = tableInfoEl.querySelector('.etoro-sell-button');
          let buyBtnEl = tableInfoEl.querySelector('.etoro-buy-button');
          if (!sellBtnEl || !buyBtnEl) {
            return;
          }
          let sellPrice = sellBtnEl.querySelector('.etoro-price-value').textContent.trim();
          let buyPrice = buyBtnEl.querySelector('.etoro-price-value').textContent.trim();
          let spreadPrice = Number(buyPrice) - Number(sellPrice);
          let spreadPercent = (spreadPrice / buyPrice) * 100;
          let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
          createSpanNode(cellNameEl, spreadAndPrice);
        });
      } else {
        let cardListEls = mainContentEl.querySelectorAll('.market-card-ph.pointer');
        cardListEls.forEach((cardEl, index) => {
          let btnSellEl = cardEl.querySelector('.etoro-sell-button');
          let btnBuyEl = cardEl.querySelector('.etoro-buy-button');
          if (!btnBuyEl || !btnSellEl) {
            return;
          }
          let sellPrice = btnSellEl.querySelector('.etoro-price-value').textContent.trim();
          let buyPrice = btnBuyEl.querySelector('.etoro-price-value').textContent.trim();
          let marketHeadEl = cardEl.querySelector('.market-card-head');
          let spreadPrice = Number(buyPrice) - Number(sellPrice);
          let spreadPercent = (spreadPrice / buyPrice) * 100;
          let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
          createSpanNode(marketHeadEl, spreadAndPrice);
        });
      }
    } catch (e) {
      console.log(e);
    }
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
        let sellPrice = sellBtnEl.querySelector('.etoro-price-value').textContent.trim();
        let buyPrice = buyBtnEl.querySelector('.etoro-price-value').textContent.trim();
        let spreadPrice = Number(buyPrice) - Number(sellPrice);
        let spreadPercent = (spreadPrice / buyPrice) * 100;
        let spreadAndPrice = '$' + toFixed(spreadPrice) + ' - ' + spreadPercent.toFixed(3) + '%';
        createSpanNode(cellNameEl, spreadAndPrice);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function toFixed(number) {
    return Math.floor(number * 1000) === 0 ? number.toFixed(5) : number.toFixed(3);
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
}());
