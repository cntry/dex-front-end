import './index.css';

import * as React from 'react';
import * as saveLoadAdapter from './saveLoadAdapter';

import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from '../../charting_library';

import { flatten } from '../../utils/utils';
import { useMarket, USE_MARKETS } from '../../utils/markets';
// import { useMarket } from '../../utils/markets';
import { convertResolutionToApi, useTvDataFeed } from '../../utils/Datafeed';
// import { convertResolutionToApi } from '../../utils/Datafeed';

import { BONFIDA_DATA_FEED } from '../../utils/bonfidaConnector';

import { test_datafeed } from '../../utils/datafeedMaks';

// export interface test_datafeed {
//   onReady: (callback: any) => void;
//   searchSymbols: (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => Promise<void>;
//   resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => Promise<void>;
//   getBars: (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any) => Promise<void>;
//   subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: any, subscribeUID: any, onResetCacheNeededCallback: any) => void;
//   unsubscribeBars: (subscriberUID: any) => void;
// }

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  auto_save_delay: ChartingLibraryWidgetOptions['auto_save_delay'];

  // BEWARE: no trailing slash is expected in feed URL
  datafeed: any;
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container_id'];
  theme: string;
  //added
  timeframe: ChartingLibraryWidgetOptions['timeframe'];
}

export interface ChartContainerState {}

export const TVChartContainer = () => {
  let datafeed = useTvDataFeed();
  // let datafeed = test_datafeed;
  let resolution = window.localStorage.getItem('resolution') ?? '60';

  

  // try {
  //   convertResolutionToApi(resolution)
  // } catch(e) {
  //   resolution = '60'
  // }

  const defaultProps: ChartContainerProps = {
    symbol: 'BTC/USDC',
    // @ts-ignore
    interval: resolution ? resolution : '60',
    // interval: '60',
    auto_save_delay: 5,
    theme: 'Dark',
    // theme: 'Light',
    containerId: 'tv_chart_container',
    // datafeed: datafeed,
    datafeed: datafeed,
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    datafeedUrl: BONFIDA_DATA_FEED,
    studiesOverrides: {},
    timeframe: '1h'
  };

  const tvWidgetRef = React.useRef<IChartingLibraryWidget | null>(null);
  const { market } = useMarket();
  const { marketName } = useMarket();

  // console.log(market);
  // if (market) {
  //   console.log(market.publicKey);
  // }

  const chartProperties = JSON.parse(
    localStorage.getItem('chartproperties') || '{}',
  );
  
    React.useEffect(() => {
      const savedProperties = flatten(chartProperties, {
        restrictTo: ['scalesProperties', 'paneProperties', 'tradingProperties'],
      });
  
      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: marketName as string,
        // symbol: 'AAPL',
        // symbol:
        //   USE_MARKETS.find(
        //     (m) => m.address.toBase58() === market?.publicKey.toBase58(),
        //   )?.name || 'SRM/USDC',
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        // @ts-ignore
        datafeed: datafeed,
        // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
        // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        //   defaultProps.datafeedUrl,
        // ),
        interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
        container_id: defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
        library_path: defaultProps.libraryPath as string,
        auto_save_delay: 5,
  
        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        load_last_chart: true,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        // theme: defaultProps.theme === 'Dark' ? 'Dark' : 'Light',
        theme: 'Light',
        overrides: {
          ...savedProperties,
          'mainSeriesProperties.candleStyle.upColor': '#41C77A',
          'mainSeriesProperties.candleStyle.downColor': '#F23B69',
          // 'mainSeriesProperties.candleStyle.downColor': '#3b6cf2',
          'mainSeriesProperties.candleStyle.borderUpColor': '#41C77A',
          'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
          'mainSeriesProperties.candleStyle.wickUpColor': '#41C77A',
          'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
        },
        // @ts-ignore
        save_load_adapter: saveLoadAdapter,
        settings_adapter: {
          initialSettings: {
            'trading.orderPanelSettingsBroker': JSON.stringify({
              showRelativePriceControl: false,
              showCurrencyRiskInQty: false,
              showPercentRiskInQty: false,
              showBracketsInCurrency: false,
              showBracketsInPercent: false,
            }),
            // "proterty"
            'trading.chart.proterty':
              localStorage.getItem('trading.chart.proterty') ||
              JSON.stringify({
                hideFloatingPanel: 1,
              }),
            'chart.favoriteDrawings':
              localStorage.getItem('chart.favoriteDrawings') ||
              JSON.stringify([]),
            'chart.favoriteDrawingsPosition':
              localStorage.getItem('chart.favoriteDrawingsPosition') ||
              JSON.stringify({}),
          },
          setValue: (key, value) => {
            localStorage.setItem(key, value);
          },
          removeValue: (key) => {
            localStorage.removeItem(key);
          },
        },
      };
  
      const tvWidget = new widget(widgetOptions);
  
      tvWidget.onChartReady(() => {
        tvWidgetRef.current = tvWidget;
        tvWidget
          // @ts-ignore
          .subscribe('onAutoSaveNeeded', () => tvWidget.saveChartToServer());
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marketName, tvWidgetRef.current]);
  // }, [chartProperties, datafeed, defaultProps.autosize, defaultProps.clientId, defaultProps.containerId, defaultProps.fullscreen, defaultProps.interval, defaultProps.libraryPath, defaultProps.studiesOverrides, defaultProps.theme, defaultProps.userId, marketName]);
  
    return <div id={defaultProps.containerId} className={'TVChartContainer'} />;
  };
  //   React.useEffect(() => {
  //     const savedProperties = flatten(chartProperties, {
  //       restrictTo: ['scalesProperties', 'paneProperties', 'tradingProperties'],
  //     });
  
  //     const widgetOptions: ChartingLibraryWidgetOptions = {
  //       symbol:
  //         USE_MARKETS.find(
  //           (m) => m.address.toBase58() === market?.publicKey.toBase58(),
  //         )?.name || 'SRM/USDC',
  //       // BEWARE: no trailing slash is expected in feed URL
  //       // tslint:disable-next-line:no-any
  //       // @ts-ignore
  //       // datafeed: datafeed,
  //       // @ts-ignore
  //       datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
  //         defaultProps.datafeedUrl,
  //       ),
  //       interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
  //       container_id: defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
  //       library_path: defaultProps.libraryPath as string,
  //       auto_save_delay: 5,
  
  //       locale: 'en',
  //       disabled_features: ['use_localstorage_for_settings'],
  //       enabled_features: ['study_templates'],
  //       load_last_chart: true,
  //       client_id: defaultProps.clientId,
  //       user_id: defaultProps.userId,
  //       fullscreen: defaultProps.fullscreen,
  //       autosize: defaultProps.autosize,
  //       studies_overrides: defaultProps.studiesOverrides,
  //       theme: defaultProps.theme === 'Dark' ? 'Dark' : 'Light',
  //       overrides: {
  //         ...savedProperties,
  //         'mainSeriesProperties.candleStyle.upColor': '#41C77A',
  //         'mainSeriesProperties.candleStyle.downColor': '#F23B69',
  //         'mainSeriesProperties.candleStyle.borderUpColor': '#41C77A',
  //         'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
  //         'mainSeriesProperties.candleStyle.wickUpColor': '#41C77A',
  //         'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
  //       },
  //       // @ts-ignore
  //       save_load_adapter: saveLoadAdapter,
  //       settings_adapter: {
  //         initialSettings: {
  //           'trading.orderPanelSettingsBroker': JSON.stringify({
  //             showRelativePriceControl: false,
  //             showCurrencyRiskInQty: false,
  //             showPercentRiskInQty: false,
  //             showBracketsInCurrency: false,
  //             showBracketsInPercent: false,
  //           }),
  //           // "proterty"
  //           'trading.chart.proterty':
  //             localStorage.getItem('trading.chart.proterty') ||
  //             JSON.stringify({
  //               hideFloatingPanel: 1,
  //             }),
  //           'chart.favoriteDrawings':
  //             localStorage.getItem('chart.favoriteDrawings') ||
  //             JSON.stringify([]),
  //           'chart.favoriteDrawingsPosition':
  //             localStorage.getItem('chart.favoriteDrawingsPosition') ||
  //             JSON.stringify({}),
  //         },
  //         setValue: (key, value) => {
  //           localStorage.setItem(key, value);
  //         },
  //         removeValue: (key) => {
  //           localStorage.removeItem(key);
  //         },
  //       },
  //     };
  
  //     const tvWidget = new widget(widgetOptions);
  
  //     tvWidget.onChartReady(() => {
  //       tvWidgetRef.current = tvWidget;
  //       tvWidget
  //         // @ts-ignore
  //         .subscribe('onAutoSaveNeeded', () => tvWidget.saveChartToServer());
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [market, tvWidgetRef.current]);
  
  //   return <div id={defaultProps.containerId} className={'TVChartContainer'} />;
  // };
// React.useEffect(() => {
//   const savedProperties = flatten(chartProperties, {
//     restrictTo: ['scalesProperties', 'paneProperties', 'tradingProperties'],
//   });

//   const widgetOptions: ChartingLibraryWidgetOptions = {
//     symbol: marketName as string,
//     datafeed: datafeed,
//     interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
//     container_id: defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
//     library_path: defaultProps.libraryPath as string,
//     auto_save_delay: 5,

//     locale: 'en',
//     disabled_features: ['use_localstorage_for_settings'],
//     enabled_features: ['study_templates'],
//     load_last_chart: true,
//     client_id: defaultProps.clientId,
//     user_id: defaultProps.userId,
//     fullscreen: defaultProps.fullscreen,
//     autosize: defaultProps.autosize,
//     studies_overrides: defaultProps.studiesOverrides,
//     theme: defaultProps.theme === 'Dark' ? 'Dark' : 'Light',
//     overrides: {
//       ...savedProperties,
//       'mainSeriesProperties.candleStyle.upColor': '#41C77A',
//       'mainSeriesProperties.candleStyle.downColor': '#F23B69',
//       // 'mainSeriesProperties.candleStyle.borderColor': '#378658',
//       'mainSeriesProperties.candleStyle.borderUpColor': '#41C77A',
//       'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
//       'mainSeriesProperties.candleStyle.wickUpColor': '#41C77A',
//       'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
//     },
//     // @ts-ignore
//     save_load_adapter: saveLoadAdapter,
//     settings_adapter: {
//       initialSettings: {
//         'trading.orderPanelSettingsBroker': JSON.stringify({
//           showRelativePriceControl: false,
//           showCurrencyRiskInQty: false,
//           showPercentRiskInQty: false,
//           showBracketsInCurrency: false,
//           showBracketsInPercent: false,
//         }),
//         // "proterty"
//         'trading.chart.proterty':
//           localStorage.getItem('trading.chart.proterty') ||
//           JSON.stringify({
//             hideFloatingPanel: 1,
//           }),
//         'chart.favoriteDrawings':
//           localStorage.getItem('chart.favoriteDrawings') ||
//           JSON.stringify([]),
//         'chart.favoriteDrawingsPosition':
//           localStorage.getItem('chart.favoriteDrawingsPosition') ||
//           JSON.stringify({}),
//       },
//       setValue: (key, value) => {
//         localStorage.setItem(key, value);
//       },
//       removeValue: (key) => {
//         localStorage.removeItem(key);
//       },
//     },
//   };

//   const tvWidget = new widget(widgetOptions);

//   tvWidget.onChartReady(() => {
//     tvWidgetRef.current = tvWidget;
//     tvWidget
//       // @ts-ignore
//       .subscribe('onAutoSaveNeeded', () => tvWidget.saveChartToServer());
//   });
// }, [chartProperties, datafeed, defaultProps.autosize, defaultProps.clientId, defaultProps.containerId, defaultProps.fullscreen, defaultProps.interval, defaultProps.libraryPath, defaultProps.studiesOverrides, defaultProps.theme, defaultProps.userId, marketName]);
//   // return <div style={{ height: window.innerWidth < 1000 ? '50vh' : 540 }} id={defaultProps.containerId} className={'TVChartContainer'} />;
//   return <div id={defaultProps.containerId} className={'TVChartContainer'} />;
// };