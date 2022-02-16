
// async function makeApiRequest(path) {
// 	try {
// 		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
// 		return response.json();
// 	} catch (error) {
// 		throw new Error(`CryptoCompare request error: ${error.status}`);
// 	}
// }

// Generate a symbol ID from a pair of the coins
// function generateSymbol(exchange, fromSymbol, toSymbol) {
// 	const short = `${fromSymbol}/${toSymbol}`;
// 	return {
// 		short,
// 		full: `${exchange}:${short}`,
// 	};
// }

 function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}
	
	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}

// const socket = io('wss://streamer.cryptocompare.com');
const channelToSubscription = new Map();
//
// socket.on('connect', () => {
// 	console.log('[socket] Connected');
// });
//
// socket.on('disconnect', (reason) => {
// 	console.log('[socket] Disconnected:', reason);
// });
//
// socket.on('error', (error) => {
// 	console.log('[socket] Error:', error);
// });
//
// socket.on('m', data => {
// 	console.log('[socket] Message:', data);
// 	const [
// 		eventTypeStr,
// 		exchange,
// 		fromSymbol,
// 		toSymbol,
// 		,
// 		,
// 		tradeTimeStr,
// 		,
// 		tradePriceStr,
// 	] = data.split('~');
//
// 	if (parseInt(eventTypeStr) !== 0) {
// 		// skip all non-TRADE events
// 		return;
// 	}
// 	const tradePrice = parseFloat(tradePriceStr);
// 	const tradeTime = parseInt(tradeTimeStr);
// 	const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
// 	const subscriptionItem = channelToSubscription.get(channelString);
// 	if (subscriptionItem === undefined) {
// 		return;
// 	}
// 	const lastDailyBar = subscriptionItem.lastDailyBar;
// 	const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
//
// 	let bar;
// 	if (tradeTime >= nextDailyBarTime) {
// 		bar = {
// 			time: nextDailyBarTime,
// 			open: tradePrice,
// 			high: tradePrice,
// 			low: tradePrice,
// 			close: tradePrice,
// 		};
// 		console.log('[socket] Generate new bar', bar);
// 	} else {
// 		bar = {
// 			...lastDailyBar,
// 			high: Math.max(lastDailyBar.high, tradePrice),
// 			low: Math.min(lastDailyBar.low, tradePrice),
// 			close: tradePrice,
// 		};
// 		console.log('[socket] Update the latest bar by price', tradePrice);
// 	}
// 	subscriptionItem.lastDailyBar = bar;
//
// 	// send data to every subscriber of that symbol
// 	subscriptionItem.handlers.forEach(handler => handler.callback(bar));
// });

// function getNextDailyBarTime(barTime) {
// 	const date = new Date(barTime * 1000);
// 	date.setDate(date.getDate() + 1);
// 	return date.getTime() / 1000;
// }

 function subscribeOnStream(
	symbolInfo,
	resolution,
	onRealtimeCallback,
	subscribeUID,
	onResetCacheNeededCallback,
	lastDailyBar,
) {
	const parsedSymbol: any = parseFullSymbol("Cocoine:BTC/USD");
	const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
	const handler = {
		id: subscribeUID,
		callback: onRealtimeCallback,
	};
	let subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem) {
		// already subscribed to the channel, use the existing subscription
		subscriptionItem.handlers.push(handler);
		return;
	}
	subscriptionItem = {
		subscribeUID,
		resolution,
		lastDailyBar,
		handlers: [handler],
	};
	channelToSubscription.set(channelString, subscriptionItem);
	console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
	// socket.emit('SubAdd', { subs: [channelString] });
}

 function unsubscribeFromStream(subscriberUID) {
	// find a subscription with id === subscriberUID
	for (const channelString of channelToSubscription.keys()) {
		const subscriptionItem = channelToSubscription.get(channelString);
		const handlerIndex = subscriptionItem.handlers
			.findIndex(handler => handler.id === subscriberUID);
		
		if (handlerIndex !== -1) {
			// remove from handlers
			subscriptionItem.handlers.splice(handlerIndex, 1);
			
			if (subscriptionItem.handlers.length === 0) {
				// unsubscribe from the channel, if it was the last handler
				console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
				// socket.emit('SubRemove', { subs: [channelString] });
				channelToSubscription.delete(channelString);
				break;
			}
		}
	}
}


const lastBarsCache = new Map();

const configurationData = {
	supported_resolutions: ['1D', '1W', '1M'],
	exchanges: [{
		value: 'Cocoine',
		name: 'Cocoine',
		desc: 'Cocoine',
	},
	],
	symbols_types: [{
		name: 'crypto',
		value: 'crypto',
	},
	],
};

async function getAllSymbols() {
	// const data = await makeApiRequest('data/v3/all/exchanges');
	// let allSymbols = [];
	//
	// for (const exchange of configurationData.exchanges) {
	// 	const pairs = data.Data[exchange.value].pairs;
	//
	// 	for (const leftPairPart of Object.keys(pairs)) {
	// 		const symbols = pairs[leftPairPart].map(rightPairPart => {
	// 			const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
	// 			return {
	// 				symbol: symbol.short,
	// 				full_name: symbol.full,
	// 				description: symbol.short,
	// 				exchange: exchange.value,
	// 				type: 'crypto',
	// 			};
	// 		});
	// 		allSymbols = [...allSymbols, ...symbols];
	// 	}
	// }
	// return allSymbols;
}

export interface test_datafeed {
	onReady: (callback: any) => void;
	searchSymbols: (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => Promise<void>;
	resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => Promise<void>;
	getBars: (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any) => Promise<void>;
	subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: any, subscribeUID: any, onResetCacheNeededCallback: any) => void;
	unsubscribeBars: (subscriberUID: any) => void;
  }

//  let test_datafeed =  {
 export let test_datafeed =  {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols: any = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		const symbolInfo = {
			ticker: "BTC/USD",
			name: "BTC/USD",
			description: "",
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: "",
			minmov: 1,
			pricescale: 100,
			has_intraday: false,
			has_no_volume: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			data_status: 'streaming',
		};

		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		// const { from, to, firstDataRequest } = periodParams;
		const {
			// from,
			// to,
			firstDataRequest,
		} = periodParams;
			let bars: any = [];
		
			if (firstDataRequest) {
				for(let i=0; i<10; i++) {
					let d = new Date();
					let set_time = d.setSeconds(0, 0);
					bars = [...bars, {
						time: set_time * 1000,
						low: 1*i,
						high: 1*i,
						open: 1*i,
						close: 1*i,
					}];
				}
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			}
			console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: false,
			});
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};

// import Datafeed from './datafeed.js';

// window.tvWidget = new TradingView.widget({
// 	symbol: 'Bitfinex:BTC/USD', // default symbol
// 	interval: '1D', // default interval
// 	fullscreen: true, // displays the chart in the fullscreen mode
// 	container: 'tv_chart_container',
// 	datafeed: Datafeed,
// 	library_path: '../charting_library_clonned_data/charting_library/',
// });
