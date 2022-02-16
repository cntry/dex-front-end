"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapButton = exports.TokenIcon = exports.SwapTokenForm = exports.ArrowButton = exports.SwapHeader = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var anchor_1 = require("@project-serum/anchor");
var core_1 = require("@material-ui/core");
// import { ExpandMore, ImportExportRounded } from "@material-ui/icons";
var Swap_1 = require("../context/Swap");
var Dex_1 = require("../context/Dex");
var TokenList_1 = require("../context/TokenList");
var Token_1 = require("../context/Token");
var Swap_2 = require("../context/Swap");
var TokenDialog_1 = __importDefault(require("./TokenDialog"));
var Settings_1 = require("./Settings");
// import { InfoLabel } from "./Info";
var pubkeys_1 = require("../utils/pubkeys");
var WrapperSpace_1 = require("../../src/components/WrapperSpace/WrapperSpace");
var SwapSubtitle_1 = require("../../src/components/SwapSubtitle/SwapSubtitle");
var SwapApproximately_1 = require("../../src/components/SwapApproximately/SwapApproximately");
// import { SwapInfoLeft } from './SwapInfoLeft/SwapInfoLeft';
// import { SwapInfoRight } from './SwapInfoRight/SwapInfoRight';
var useStyles = core_1.makeStyles(function (theme) { return ({
    card: {
        width: theme.spacing(50),
        borderRadius: "4px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        padding: "13px 17px 18px 15px",
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    tab: {
        width: "50%",
    },
    settingsButton: {
        padding: 0,
    },
    // swapButton: {
    //   width: "100%",
    //   borderRadius: theme.spacing(2),
    //   backgroundColor: theme.palette.primary.main,
    //   // backgroundColor: "blue",
    //   color: theme.palette.primary.contrastText,
    //   fontSize: 16,
    //   fontWeight: 700,
    //   padding: theme.spacing(1.5),
    //   cursor: "pointer",
    // },
    swapButton: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "38px",
        background: "#fff",
        textTransform: "capitalize",
        border: "2px solid #2F80ED",
        color: "#2F80ED",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "22px",
        //Temporarily margin-top
        marginTop: "21px",
    },
    swapButton__img: {
        marginRight: "13px",
    },
    swapToFromButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outlineColor: "transparent",
        outlineWidth: "0px",
        // margin: "10px auto 10px auto",
        cursor: "pointer",
        width: "32px",
        height: "32px",
        backgroundColor: "#2F80ED",
        borderRadius: "4px",
        margin: "16px auto 0 auto",
        transition: ".2s ease-in-out",
        "&:active, &:focus": {
            outlineColor: "transparent",
            outlineWidth: "0px",
        },
        "&:hover": {
            backgroundColor: "#226ac9",
            transition: ".2s ease-in-out",
        }
    },
    amountInput: {
        fontSize: 14,
        fontWeight: 400,
    },
    input: {
        textAlign: "right",
        paddingBottom: "0px",
        paddingTop: "3px",
    },
    swapTokenFormContainer: {
        // borderRadius: theme.spacing(2),
        // boxShadow: "0px 0px 15px 2px rgba(33,150,243,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: theme.spacing(1),
        marginTop: "4px",
        padding: "8px 16px",
        background: "rgba(47, 128, 237, 0.1)",
        borderRadius: "4px",
    },
    swapTokenSelectorContainer: {
        marginLeft: 0,
        display: "flex",
        flexDirection: "column",
        width: "50%",
        '& > div': {
            fontWeight: 400,
        }
    },
    balanceContainer: {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
    },
    swapTextField: {
        // fontWeight: 400,
        // fontSize: "14px",
        border: "1px solid blue",
        "div": {
            fontWeight: 400,
            fontSize: "14px",
        }
    },
    maxButton: {
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
    },
    tokenButton: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    tokenSymbol: {
        display: "block",
        textAlign: "left",
        minWidth: "38px",
        fontSize: "14px",
        lineHeight: "22px",
        // height: "22px",
        // margin: "9px 16px 9px 0",
        marginTop: "3px",
    }
}); });
function SwapCard(_a) {
    var containerStyle = _a.containerStyle, contentStyle = _a.contentStyle, swapTokenContainerStyle = _a.swapTokenContainerStyle, isConnected = _a.isConnected, wallet = _a.wallet;
    var styles = useStyles();
    return (react_1.default.createElement(core_1.Card, { className: styles.card, style: containerStyle },
        react_1.default.createElement(SwapHeader, null),
        react_1.default.createElement("div", { style: contentStyle },
            react_1.default.createElement(WrapperSpace_1.WrapperSpace, null,
                react_1.default.createElement(SwapSubtitle_1.SwapSubtitle, { text: "You pay" }),
                react_1.default.createElement(SwapApproximately_1.SwapApproximately, { digits: "\u2248 $123.33" })),
            react_1.default.createElement(SwapFromForm, { style: swapTokenContainerStyle }),
            react_1.default.createElement(ArrowButton, null),
            react_1.default.createElement(WrapperSpace_1.WrapperSpace, null,
                react_1.default.createElement(SwapSubtitle_1.SwapSubtitle, { text: "You receive" }),
                react_1.default.createElement(SwapApproximately_1.SwapApproximately, { digits: "\u2248 $123.33 (-0.22%)" })),
            react_1.default.createElement(SwapToForm, { style: swapTokenContainerStyle }),
            react_1.default.createElement(SwapButton, { isConnected: isConnected, wallet: wallet }))));
}
exports.default = SwapCard;
function SwapHeader() {
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
        } },
        react_1.default.createElement(core_1.Typography, { style: {
                fontSize: 24,
                fontWeight: 700,
                lineHeight: '24px',
                color: '#2F80ED'
            } }, "Swap"),
        react_1.default.createElement(Settings_1.SettingsButton, null)));
}
exports.SwapHeader = SwapHeader;
function ArrowButton() {
    var styles = useStyles();
    // const theme = useTheme();
    var swapToFromMints = Swap_1.useSwapContext().swapToFromMints;
    return (
    // <ImportExportRounded
    //   className={styles.swapToFromButton}
    //   fontSize="large"
    //   htmlColor={theme.palette.primary.main}
    //   onClick={swapToFromMints}
    // />
    react_1.default.createElement("button", { className: styles.swapToFromButton, onClick: swapToFromMints },
        react_1.default.createElement("img", { src: "arrowSwap.svg", alt: "arrowSwap" })));
}
exports.ArrowButton = ArrowButton;
function SwapFromForm(_a) {
    var style = _a.style;
    var _b = Swap_1.useSwapContext(), fromMint = _b.fromMint, setFromMint = _b.setFromMint, fromAmount = _b.fromAmount, setFromAmount = _b.setFromAmount;
    // console.log(fromMint, 'fromMint');
    // console.log(fromAmount, 'fromAmount');
    return (react_1.default.createElement(SwapTokenForm, { from: true, style: style, mint: fromMint, setMint: setFromMint, amount: fromAmount, setAmount: setFromAmount }));
}
function SwapToForm(_a) {
    var style = _a.style;
    var _b = Swap_1.useSwapContext(), toMint = _b.toMint, setToMint = _b.setToMint, toAmount = _b.toAmount, setToAmount = _b.setToAmount;
    // console.log(toMint, 'toMint');
    // console.log(toAmount, 'toAmount');
    return (react_1.default.createElement(SwapTokenForm, { from: false, style: style, mint: toMint, setMint: setToMint, amount: toAmount, setAmount: setToAmount }));
}
function SwapTokenForm(_a) {
    var from = _a.from, style = _a.style, mint = _a.mint, setMint = _a.setMint, amount = _a.amount, setAmount = _a.setAmount;
    var styles = useStyles();
    var _b = react_2.useState(false), showTokenDialog = _b[0], setShowTokenDialog = _b[1];
    var tokenAccount = Token_1.useOwnedTokenAccount(mint);
    var mintAccount = Token_1.useMint(mint);
    var balance = tokenAccount &&
        mintAccount &&
        tokenAccount.account.amount.toNumber() / Math.pow(10, mintAccount.decimals);
    var formattedAmount = mintAccount && amount
        ? amount.toLocaleString("fullwide", {
            maximumFractionDigits: mintAccount.decimals,
            useGrouping: false,
        })
        : amount;
    // console.log(formattedAmount);
    // console.log(amount);
    return (react_1.default.createElement("div", { className: styles.swapTokenFormContainer, style: style },
        react_1.default.createElement("div", { className: styles.swapTokenSelectorContainer },
            react_1.default.createElement(TokenButton, { mint: mint, onClick: function () { return setShowTokenDialog(true); } })),
        react_1.default.createElement(core_1.TextField, { type: "number", value: formattedAmount, 
            // className={styles.swapTextField}
            // InputProps={{
            //   className: styles.swapTextField,
            // }}
            onChange: function (e) { return setAmount(parseFloat(e.target.value)); }, InputProps: {
                disableUnderline: true,
                classes: {
                    root: styles.amountInput,
                    input: styles.input,
                },
            } }),
        react_1.default.createElement(TokenSymbol, { mint: mint }),
        react_1.default.createElement(TokenDialog_1.default, { setMint: setMint, open: showTokenDialog, onClose: function () { return setShowTokenDialog(false); } })));
}
exports.SwapTokenForm = SwapTokenForm;
function TokenButton(_a) {
    var mint = _a.mint, onClick = _a.onClick;
    var styles = useStyles();
    var theme = core_1.useTheme();
    return (react_1.default.createElement("div", { onClick: onClick, className: styles.tokenButton },
        react_1.default.createElement(TokenIcon, { mint: mint, style: { width: theme.spacing(3) } }),
        react_1.default.createElement(TokenName, { mint: mint, style: { fontSize: 14, fontWeight: 400, margin: "3px 8px 0 4px", color: "#000" } }),
        react_1.default.createElement("img", { style: { margin: "3px 0 0 0" }, src: "arrowDown.svg", alt: "arrowDown" })));
}
function TokenIcon(_a) {
    var mint = _a.mint, style = _a.style;
    var tokenMap = TokenList_1.useTokenMap();
    var tokenInfo = tokenMap.get(mint.toString());
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        } }, (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.logoURI) ? (react_1.default.createElement("img", { alt: "Logo", style: style, src: tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.logoURI })) : (react_1.default.createElement("div", { style: style }))));
}
exports.TokenIcon = TokenIcon;
function TokenName(_a) {
    var mint = _a.mint, style = _a.style;
    var tokenMap = TokenList_1.useTokenMap();
    var theme = core_1.useTheme();
    var tokenInfo = tokenMap.get(mint.toString());
    return (react_1.default.createElement(core_1.Typography, { style: __assign({ marginLeft: theme.spacing(2), marginRight: theme.spacing(1) }, style) }, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.name));
}
function TokenSymbol(_a) {
    var mint = _a.mint;
    var styles = useStyles();
    var tokenMap = TokenList_1.useTokenMap();
    var tokenInfo = tokenMap.get(mint.toString());
    return (react_1.default.createElement("span", { className: styles.tokenSymbol }, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.symbol));
}
function SwapButton(props) {
    var _this = this;
    var isConnected = props.isConnected, wallet = props.wallet;
    var styles = useStyles();
    var _a = Swap_1.useSwapContext(), fromMint = _a.fromMint, toMint = _a.toMint, fromAmount = _a.fromAmount, slippage = _a.slippage, isClosingNewAccounts = _a.isClosingNewAccounts, isStrict = _a.isStrict;
    var swapClient = Dex_1.useDexContext().swapClient;
    var fromMintInfo = Token_1.useMint(fromMint);
    var toMintInfo = Token_1.useMint(toMint);
    var openOrders = Dex_1.useOpenOrders();
    var route = Dex_1.useRouteVerbose(fromMint, toMint);
    var fromMarket = Dex_1.useMarket(route && route.markets ? route.markets[0] : undefined);
    var toMarket = Dex_1.useMarket(route && route.markets ? route.markets[1] : undefined);
    var canSwap = Swap_2.useCanSwap();
    var referral = Swap_2.useReferral(fromMarket);
    var fair = Swap_1.useSwapFair();
    var fromWallet = Token_1.useOwnedTokenAccount(fromMint);
    var toWallet = Token_1.useOwnedTokenAccount(toMint);
    var quoteMint = fromMarket && fromMarket.quoteMintAddress;
    var quoteMintInfo = Token_1.useMint(quoteMint);
    var quoteWallet = Token_1.useOwnedTokenAccount(quoteMint);
    // Click handler.
    var sendSwapTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
        var amount, isSol, wrappedSolAccount, txs, _a, wrapTx, wrapSigners, _b, unwrapTx, unwrapSigners, tx;
        var _c, _d;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!fromMintInfo || !toMintInfo) {
                        throw new Error("Unable to calculate mint decimals");
                    }
                    if (!fair) {
                        throw new Error("Invalid fair");
                    }
                    if (!quoteMint || !quoteMintInfo) {
                        throw new Error("Quote mint not found");
                    }
                    amount = new anchor_1.BN(fromAmount * Math.pow(10, fromMintInfo.decimals));
                    isSol = fromMint.equals(pubkeys_1.SOL_MINT) || toMint.equals(pubkeys_1.SOL_MINT);
                    wrappedSolAccount = isSol ? web3_js_1.Keypair.generate() : undefined;
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var minExchangeRate, fromOpenOrders, toOpenOrders, fromWalletAddr, toWalletAddr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!fromMarket) {
                                            throw new Error("Market undefined");
                                        }
                                        minExchangeRate = {
                                            rate: new anchor_1.BN((Math.pow(10, toMintInfo.decimals) * Dex_1.FEE_MULTIPLIER) / fair)
                                                .muln(100 - slippage)
                                                .divn(100),
                                            fromDecimals: fromMintInfo.decimals,
                                            quoteDecimals: quoteMintInfo.decimals,
                                            strict: isStrict,
                                        };
                                        fromOpenOrders = fromMarket
                                            ? openOrders.get(fromMarket === null || fromMarket === void 0 ? void 0 : fromMarket.address.toString())
                                            : undefined;
                                        toOpenOrders = toMarket
                                            ? openOrders.get(toMarket === null || toMarket === void 0 ? void 0 : toMarket.address.toString())
                                            : undefined;
                                        fromWalletAddr = fromMint.equals(pubkeys_1.SOL_MINT)
                                            ? wrappedSolAccount.publicKey
                                            : fromWallet
                                                ? fromWallet.publicKey
                                                : undefined;
                                        toWalletAddr = toMint.equals(pubkeys_1.SOL_MINT)
                                            ? wrappedSolAccount.publicKey
                                            : toWallet
                                                ? toWallet.publicKey
                                                : undefined;
                                        return [4 /*yield*/, swapClient.swapTxs({
                                                fromMint: fromMint,
                                                toMint: toMint,
                                                quoteMint: quoteMint,
                                                amount: amount,
                                                minExchangeRate: minExchangeRate,
                                                referral: referral,
                                                fromMarket: fromMarket,
                                                toMarket: toMarket,
                                                // Automatically created if undefined.
                                                fromOpenOrders: fromOpenOrders ? fromOpenOrders[0].address : undefined,
                                                toOpenOrders: toOpenOrders ? toOpenOrders[0].address : undefined,
                                                fromWallet: fromWalletAddr,
                                                toWallet: toWalletAddr,
                                                quoteWallet: quoteWallet ? quoteWallet.publicKey : undefined,
                                                // Auto close newly created open orders accounts.
                                                close: isClosingNewAccounts,
                                            })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })()];
                case 1:
                    txs = _e.sent();
                    if (!isSol) return [3 /*break*/, 3];
                    if (txs.length > 1) {
                        throw new Error("SOL must be swapped in a single transaction");
                    }
                    return [4 /*yield*/, wrapSol(swapClient.program.provider, wrappedSolAccount, fromMint, amount)];
                case 2:
                    _a = _e.sent(), wrapTx = _a.tx, wrapSigners = _a.signers;
                    _b = unwrapSol(swapClient.program.provider, wrappedSolAccount), unwrapTx = _b.tx, unwrapSigners = _b.signers;
                    tx = new web3_js_1.Transaction();
                    tx.add(wrapTx);
                    tx.add(txs[0].tx);
                    tx.add(unwrapTx);
                    txs[0].tx = tx;
                    (_c = txs[0].signers).push.apply(_c, wrapSigners);
                    (_d = txs[0].signers).push.apply(_d, unwrapSigners);
                    _e.label = 3;
                case 3: return [4 /*yield*/, swapClient.program.provider.sendAll(txs)];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement(react_1.default.Fragment, null, canSwap
        ? (react_1.default.createElement(core_1.Button, { variant: "contained", className: styles.swapButton, onClick: sendSwapTransaction }, "Swap"))
        : (react_1.default.createElement(core_1.Button
        // variant="contained"
        , { 
            // variant="contained"
            variant: "outlined", className: styles.swapButton, onClick: function () { return (!isConnected ? wallet.connect() : wallet.disconnect()); } },
            react_1.default.createElement("img", { className: styles.swapButton__img, src: "wallet.svg", alt: "wallet" }),
            "Connect Wallet"))));
}
exports.SwapButton = SwapButton;
function wrapSol(provider, wrappedSolAccount, fromMint, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var tx, signers, _a, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    tx = new web3_js_1.Transaction();
                    signers = [wrappedSolAccount];
                    // Create new, rent exempt account.
                    _b = (_a = tx).add;
                    _d = (_c = web3_js_1.SystemProgram).createAccount;
                    _e = {
                        fromPubkey: provider.wallet.publicKey,
                        newAccountPubkey: wrappedSolAccount.publicKey
                    };
                    return [4 /*yield*/, spl_token_1.Token.getMinBalanceRentForExemptAccount(provider.connection)];
                case 1:
                    // Create new, rent exempt account.
                    _b.apply(_a, [_d.apply(_c, [(_e.lamports = _f.sent(),
                                _e.space = 165,
                                _e.programId = spl_token_1.TOKEN_PROGRAM_ID,
                                _e)])]);
                    // Transfer lamports. These will be converted to an SPL balance by the
                    // token program.
                    if (fromMint.equals(pubkeys_1.SOL_MINT)) {
                        tx.add(web3_js_1.SystemProgram.transfer({
                            fromPubkey: provider.wallet.publicKey,
                            toPubkey: wrappedSolAccount.publicKey,
                            lamports: amount.toNumber(),
                        }));
                    }
                    // Initialize the account.
                    tx.add(spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, pubkeys_1.WRAPPED_SOL_MINT, wrappedSolAccount.publicKey, provider.wallet.publicKey));
                    return [2 /*return*/, { tx: tx, signers: signers }];
            }
        });
    });
}
function unwrapSol(provider, wrappedSolAccount) {
    var tx = new web3_js_1.Transaction();
    tx.add(spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, wrappedSolAccount.publicKey, provider.wallet.publicKey, provider.wallet.publicKey, []));
    return { tx: tx, signers: [] };
}
