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
exports.InfoLabel = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var material_ui_popup_state_1 = __importStar(require("material-ui-popup-state"));
var TokenList_1 = require("../context/TokenList");
var Swap_1 = require("../context/Swap");
var Token_1 = require("../context/Token");
var Dex_1 = require("../context/Dex");
var useStyles = core_1.makeStyles(function () { return ({
    infoLabel: {
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    infoButton: {
        marginLeft: "5px",
        padding: 0,
        fontSize: "14px",
    },
}); });
function InfoLabel() {
    var styles = useStyles();
    var _a = Swap_1.useSwapContext(), fromMint = _a.fromMint, toMint = _a.toMint;
    var fromMintInfo = Token_1.useMint(fromMint);
    var fair = Swap_1.useSwapFair();
    var tokenMap = TokenList_1.useTokenMap();
    var fromTokenInfo = tokenMap.get(fromMint.toString());
    var toTokenInfo = tokenMap.get(toMint.toString());
    return (react_1.default.createElement("div", { className: styles.infoLabel },
        react_1.default.createElement(core_1.Typography, { color: "textSecondary", style: { fontSize: "14px" } }, fair !== undefined && toTokenInfo && fromTokenInfo
            ? "1 " + toTokenInfo.symbol + " = " + fair.toFixed(fromMintInfo === null || fromMintInfo === void 0 ? void 0 : fromMintInfo.decimals) + " " + fromTokenInfo.symbol
            : "-"),
        react_1.default.createElement(InfoButton, null)));
}
exports.InfoLabel = InfoLabel;
function InfoButton() {
    var styles = useStyles();
    return (react_1.default.createElement(material_ui_popup_state_1.default, { variant: "popover" }, 
    //@ts-ignore
    function (popupState) { return (react_1.default.createElement("div", { style: { display: "flex" } },
        react_1.default.createElement(core_1.IconButton, __assign({}, material_ui_popup_state_1.bindTrigger(popupState), { className: styles.infoButton }),
            react_1.default.createElement(icons_1.Info, { fontSize: "small" })),
        react_1.default.createElement(core_1.Popover, __assign({}, material_ui_popup_state_1.bindPopover(popupState), { anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            }, transformOrigin: {
                vertical: "top",
                horizontal: "right",
            }, PaperProps: { style: { borderRadius: "10px" } }, disableRestoreFocus: true }),
            react_1.default.createElement(InfoDetails, null)))); }));
}
function InfoDetails() {
    var _a, _b;
    var _c = Swap_1.useSwapContext(), fromMint = _c.fromMint, toMint = _c.toMint;
    var route = Dex_1.useRoute(fromMint, toMint);
    var tokenMap = TokenList_1.useTokenMap();
    var fromMintTicker = (_a = tokenMap.get(fromMint.toString())) === null || _a === void 0 ? void 0 : _a.symbol;
    var toMintTicker = (_b = tokenMap.get(toMint.toString())) === null || _b === void 0 ? void 0 : _b.symbol;
    var addresses = [
        { ticker: fromMintTicker, mint: fromMint },
        { ticker: toMintTicker, mint: toMint },
    ];
    return (react_1.default.createElement("div", { style: { padding: "15px", width: "250px" } },
        react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.Typography, { color: "textSecondary", style: { fontWeight: "bold", marginBottom: "5px" } }, "Trade Route"),
            route ? (route.map(function (market) {
                return react_1.default.createElement(MarketRoute, { key: market.toString(), market: market });
            })) : (react_1.default.createElement(core_1.Typography, { color: "textSecondary" }, "Route not found"))),
        react_1.default.createElement("div", { style: { marginTop: "15px" } },
            react_1.default.createElement(core_1.Typography, { color: "textSecondary", style: { fontWeight: "bold", marginBottom: "5px" } }, "Tokens"),
            addresses.map(function (address) {
                return (react_1.default.createElement("div", { key: address.mint.toString(), style: {
                        marginTop: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    react_1.default.createElement(core_1.Link, { href: "https://explorer.solana.com/address/" + address.mint.toString(), target: "_blank", rel: "noopener" }, address.ticker),
                    react_1.default.createElement("code", { style: { width: "128px", overflow: "hidden" } }, address.mint.toString())));
            }))));
}
function MarketRoute(_a) {
    var market = _a.market;
    var marketName = Dex_1.useMarketName(market);
    var bbo = Dex_1.useBbo(market);
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
        } },
        react_1.default.createElement(core_1.Link, { href: "https://dex.projectserum.com/#/market/" + market.toString(), target: "_blank", rel: "noopener" }, marketName),
        react_1.default.createElement("code", { style: { marginLeft: "10px" } }, bbo && bbo.mid ? bbo.mid.toFixed(6) : "-")));
}
