//---------------------------
//-------ЭТО ПРИМЕР ПОДКЛЮЧЕНИЯ ДАННЫХ КОГДА БУДУТ
//-------РЕАЛЬНЫЕ ДАННЫЕ
//---------------------------
function realTWData() {
  let feed = [];
  let subscribe;
  let History = [];
  let run = [];
  let lastBar = {
    close: 0,
  };
  let resolutions = ['30', '60', '120', '240', 'D', 'W', 'M'];
  const configurationData = {
    // supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "240",'D', 'W', 'M'],
    supported_resolutions: resolutions,
    exchanges: [
      {
        value: 'Cocoine',
        name: 'Cocoine',
        desc: 'Cocoine',
      },
    ],
    symbols_types: [
      {
        name: 'crypto',
        value: 'crypto',
      },
    ],
  };
  let rmo_Datafeed = {
    onReady: (callback) => {
      setTimeout(() => callback(configurationData));
    },

    searchSymbols: async (
      userInput,
      exchange,
      symbolType,
      onResultReadyCallback,
    ) => {
      const symbols = await getAllSymbols();
      const newSymbols = symbols.filter((symbol) => {
        const isExchangeValid = exchange === '' || symbol.exchange === exchange;
        const isFullSymbolContainsInput =
          symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !==
          -1;
        return isExchangeValid && isFullSymbolContainsInput;
      });
      onResultReadyCallback(newSymbols);
    },

    resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback,
    ) => {
      let sName = symbolName.split(':');
      const symbolInfo = {
        ticker: sName[1],
        name: sName[1],
        description: '',
        type: 'crypto',
        session: '24x7',
        timezone: 'Europe/Athens',
        exchange: '',
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        has_no_volume: false,
        has_weekly_and_monthly: true,
        // supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "240",'D', 'W', 'M'],
        supported_resolutions: resolutions,
        volume_precision: 8,
        data_status: 'streaming',
      };

      onSymbolResolvedCallback(symbolInfo);
    },

    getBars: async (
      symbolInfo,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback,
    ) => {
      const { from, to, firstDataRequest } = periodParams;
      let bars = [];
      let OURsymbolInfo = symbolInfo;

      if (firstDataRequest && !IsHistoryLoaded) {
        IsHistoryLoaded = true;
        $.ajax({
          url:
            window.location.origin +
            '/dashboard/history?symbol=' +
            encodeURIComponent(symbolInfo.name) +
            '&resolution=' +
            parseInt(resolution) +
            '&from=' +
            from +
            '&to=' +
            to,
          type: 'GET',
          success: function (data) {
            data[1].forEach(addFeedData);

            lastBarsCache.set(symbolInfo.full_name, {
              ...History[History.length - 1],
            });

            onHistoryCallback(History, {
              noData: false,
            });
            console.log('History was loaded');
          },
          error: function (err) {
            console.log(
              'Error while loading TradingView history: ' + err.message,
            );
          },
        });
      } else {
        onHistoryCallback([], {
          noData: false,
        });
      }
    },

    subscribeBars: (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
    ) => {
      subscribe = onRealtimeCallback;
    },
    calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
      return resolution < 60
        ? {
            resolutionBack: '1',
            intervalBack: '10',
          }
        : undefined;
    },
    unsubscribeBars: (subscriberUID) => {
      // unsubscribeFromStream(subscriberUID);
    },
  };

  let widget = (window.tvWidget = new TradingView.widget({
    debug: true,
    allow_symbol_change: true,
    autosize: true,
    symbol: 'Cocoine:' + currencyPair,
    theme: tradingViewTheme,
    timezone: 'Europe/Athens',
    interval: resolutions[0],
    container_id: 'traidingViewMobile',
    datafeed: rmo_Datafeed,
    library_path: '/client/v2/libs/charting_library/',
    locale: lang || 'en',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
    disabled_features: [
      'header_symbol_search',
      'cl_feed_return_all_data',
      'use_localstorage_for_settings',
      'link_to_tradingview',
    ],
    enabled_features: ['right_bar_stays_on_scroll', 'minimalistic_logo'],
    overrides: {
      'mainSeriesProperties.showCountdown': false,
      'symbolWatermarkProperties.transparency': 1,
      'mainSeriesProperties.style': 2,
      'mainSeriesProperties.lineStyle.color': '#2BB596',
      'mainSeriesProperties.lineStyle.linestyle': 0,
      'mainSeriesProperties.lineStyle.linewidth': 2,
      'mainSeriesProperties.lineStyle.priceSource': 'close',

      'scalesProperties.showStudyLastValue': true,
      'scalesProperties.showRightScale': true,
      'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0.00)',

      'mainSeriesProperties.priceLineWidth': 2,
      'mainSeriesProperties.priceLineColor': 'red',

      'mainSeriesProperties.hollowCandleStyle.drawWick': false,
      'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
    },
  }));
}
//---------------------------
//-------КОНЕЦ ПРИМЕРА
//---------------------------
//---------------------------

//---------------------------
//------- ТУТ МЫ ПОДКЛЮЧАЕМ ТЕСТОВЫЕ ДАННЕ
//------- ТУТ МЫ ПОДКЛЮЧАЕМ ТЕСТОВЫЕ ДАННЫЕ КОТОРЫЕ БЕРУТЬСЯ С URL TW
//---------------------------
function testTWData() {
  var widget = (window.tvWidget = new TradingView.widget({
    debug: true, // uncomment this line to see Library errors and warnings in the console
    fullscreen: false,
    symbol: 'AAPL',
    interval: '1D',
    container: 'chart_container',

    //	BEWARE: no trailing slash is expected in feed URL
    datafeed: new Datafeeds.UDFCompatibleDatafeed(
      'https://demo-feed-data.tradingview.com',
    ),
    library_path: 'charting_library/',

    disabled_features: ['use_localstorage_for_settings'],
    enabled_features: ['study_templates'],
    charts_storage_url: 'https://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
  }));
}

//---------------------------
//------- КОНЕЦ ПРИМЕРА
//------- ТЕСТОВЫХ TW ДАННЫХ
//---------------------------
window.onload = function () {
  testTWData();
};
