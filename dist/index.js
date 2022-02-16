"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBbo = exports.useMarketName = exports.useFairRoute = exports.DexContextProvider = exports.useMint = exports.TokenContextProvider = exports.useTokenMap = exports.TokenListContextProvider = exports.useSwapFair = exports.useSwapContext = exports.SwapContextProvider = exports.TokenDialog = exports.SwapButton = exports.ArrowButton = exports.SwapTokenForm = exports.SwapHeader = exports.SwapCard = exports.Swap = void 0;
var react_1 = __importDefault(require("react"));
var swap_1 = require("@project-serum/swap");
var styles_1 = require("@material-ui/core/styles");
var Swap_1 = require("./context/Swap");
Object.defineProperty(exports, "SwapContextProvider", { enumerable: true, get: function () { return Swap_1.SwapContextProvider; } });
Object.defineProperty(exports, "useSwapContext", { enumerable: true, get: function () { return Swap_1.useSwapContext; } });
Object.defineProperty(exports, "useSwapFair", { enumerable: true, get: function () { return Swap_1.useSwapFair; } });
var Dex_1 = require("./context/Dex");
Object.defineProperty(exports, "DexContextProvider", { enumerable: true, get: function () { return Dex_1.DexContextProvider; } });
Object.defineProperty(exports, "useBbo", { enumerable: true, get: function () { return Dex_1.useBbo; } });
Object.defineProperty(exports, "useFairRoute", { enumerable: true, get: function () { return Dex_1.useFairRoute; } });
Object.defineProperty(exports, "useMarketName", { enumerable: true, get: function () { return Dex_1.useMarketName; } });
var TokenList_1 = require("./context/TokenList");
Object.defineProperty(exports, "TokenListContextProvider", { enumerable: true, get: function () { return TokenList_1.TokenListContextProvider; } });
Object.defineProperty(exports, "useTokenMap", { enumerable: true, get: function () { return TokenList_1.useTokenMap; } });
var Token_1 = require("./context/Token");
Object.defineProperty(exports, "TokenContextProvider", { enumerable: true, get: function () { return Token_1.TokenContextProvider; } });
Object.defineProperty(exports, "useMint", { enumerable: true, get: function () { return Token_1.useMint; } });
var Swap_2 = __importStar(require("./components/Swap"));
exports.SwapCard = Swap_2.default;
Object.defineProperty(exports, "ArrowButton", { enumerable: true, get: function () { return Swap_2.ArrowButton; } });
Object.defineProperty(exports, "SwapButton", { enumerable: true, get: function () { return Swap_2.SwapButton; } });
Object.defineProperty(exports, "SwapHeader", { enumerable: true, get: function () { return Swap_2.SwapHeader; } });
Object.defineProperty(exports, "SwapTokenForm", { enumerable: true, get: function () { return Swap_2.SwapTokenForm; } });
var TokenDialog_1 = __importDefault(require("./components/TokenDialog"));
exports.TokenDialog = TokenDialog_1.default;
/**
 * A`Swap` component that can be embedded into applications. To use,
 * one can, minimally, provide a provider and token list to the component.
 * For example,
 *
 * ```javascript
 * <Swap provider={provider} tokenList={tokenList} />
 * ```
 *
 * All of the complexity of communicating with the Serum DEX and managing
 * its data is handled internally by the component.
 *
 * For information on other properties like earning referrals, see the
 * [[SwapProps]] documentation.
 */
function Swap(props) {
    var containerStyle = props.containerStyle, contentStyle = props.contentStyle, swapTokenContainerStyle = props.swapTokenContainerStyle, materialTheme = props.materialTheme, provider = props.provider, tokenList = props.tokenList, fromMint = props.fromMint, toMint = props.toMint, fromAmount = props.fromAmount, toAmount = props.toAmount, referral = props.referral, isConnected = props.isConnected, wallet = props.wallet;
    // @ts-ignore
    var swapClient = new swap_1.Swap(provider, tokenList);
    var theme = styles_1.createTheme(materialTheme || {
        palette: {
            primary: {
                main: "#2196F3",
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: "#E0E0E0",
                light: "#595959",
            },
            error: {
                main: "#ff6b6b",
            },
        },
    });
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(TokenList_1.TokenListContextProvider, { tokenList: tokenList },
            react_1.default.createElement(Token_1.TokenContextProvider, { provider: provider },
                react_1.default.createElement(Dex_1.DexContextProvider, { swapClient: swapClient },
                    react_1.default.createElement(Swap_1.SwapContextProvider, { fromMint: fromMint, toMint: toMint, fromAmount: fromAmount, toAmount: toAmount, referral: referral },
                        react_1.default.createElement(Swap_2.default, { containerStyle: containerStyle, contentStyle: contentStyle, swapTokenContainerStyle: swapTokenContainerStyle, isConnected: isConnected, wallet: wallet })))))));
}
exports.default = Swap;
exports.Swap = Swap;
