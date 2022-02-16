"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var web3_js_1 = require("@solana/web3.js");
var core_1 = require("@material-ui/core");
var Swap_1 = require("./Swap");
var TokenList_1 = require("../context/TokenList");
var core_2 = require("@material-ui/core");
var useStyles = core_1.makeStyles(function (theme) { return ({
    dialogContent: {
        padding: 0,
    },
    textField: {
        marginBottom: "8px",
    },
    tab: {
        minWidth: "134px",
    },
    tabSelected: {
        color: theme.palette.primary.contrastText,
        fontWeight: 700,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
    },
    tabIndicator: {
        opacity: 0,
    },
}); });
function TokenDialog(_a) {
    var open = _a.open, onClose = _a.onClose, setMint = _a.setMint;
    var _b = react_2.useState(0), tabSelection = _b[0], setTabSelection = _b[1];
    var _c = react_2.useState(""), tokenFilter = _c[0], setTokenFilter = _c[1];
    var filter = tokenFilter.toLowerCase();
    var styles = useStyles();
    var _d = TokenList_1.useSwappableTokens(), swappableTokens = _d.swappableTokens, swappableTokensSollet = _d.swappableTokensSollet, swappableTokensWormhole = _d.swappableTokensWormhole;
    var displayTabs = !core_2.useMediaQuery("(max-width:450px)");
    var selectedTokens = tabSelection === 0
        ? swappableTokens
        : tabSelection === 1
            ? swappableTokensWormhole
            : swappableTokensSollet;
    var tokens = tokenFilter === ""
        ? selectedTokens
        : selectedTokens.filter(function (t) {
            return t.symbol.toLowerCase().startsWith(filter) ||
                t.name.toLowerCase().startsWith(filter) ||
                t.address.toLowerCase().startsWith(filter);
        });
    return (react_1.default.createElement(core_1.Dialog, { open: open, onClose: onClose, scroll: "paper", PaperProps: {
            style: {
                borderRadius: "10px",
                width: "420px",
            },
        } },
        react_1.default.createElement(core_1.DialogTitle, { style: { fontWeight: "bold" } },
            react_1.default.createElement(core_1.Typography, { variant: "h6", style: { paddingBottom: "16px" } }, "Select a token"),
            react_1.default.createElement(core_1.TextField, { className: styles.textField, placeholder: "Search name", value: tokenFilter, fullWidth: true, variant: "outlined", onChange: function (e) { return setTokenFilter(e.target.value); } })),
        react_1.default.createElement(core_1.DialogContent, { className: styles.dialogContent, dividers: true },
            react_1.default.createElement(core_1.List, { disablePadding: true }, tokens.map(function (tokenInfo) { return (react_1.default.createElement(TokenListItem, { key: tokenInfo.address, tokenInfo: tokenInfo, onClick: function (mint) {
                    setMint(mint);
                    onClose();
                } })); }))),
        displayTabs && (react_1.default.createElement(core_1.DialogActions, null,
            react_1.default.createElement(core_1.Tabs, { value: tabSelection, onChange: function (e, v) { return setTabSelection(v); }, classes: {
                    indicator: styles.tabIndicator,
                } },
                react_1.default.createElement(core_1.Tab, { value: 0, className: styles.tab, classes: { selected: styles.tabSelected }, label: "Main" }),
                react_1.default.createElement(core_1.Tab, { value: 1, className: styles.tab, classes: { selected: styles.tabSelected }, label: "Wormhole" }),
                react_1.default.createElement(core_1.Tab, { value: 2, className: styles.tab, classes: { selected: styles.tabSelected }, label: "Sollet" }))))));
}
exports.default = TokenDialog;
function TokenListItem(_a) {
    var tokenInfo = _a.tokenInfo, onClick = _a.onClick;
    var mint = new web3_js_1.PublicKey(tokenInfo.address);
    return (react_1.default.createElement(core_1.ListItem, { button: true, onClick: function () { return onClick(mint); }, style: { padding: "10px 20px" } },
        react_1.default.createElement(Swap_1.TokenIcon, { mint: mint, style: { width: "30px", borderRadius: "15px" } }),
        react_1.default.createElement(TokenName, { tokenInfo: tokenInfo })));
}
function TokenName(_a) {
    var tokenInfo = _a.tokenInfo;
    return (react_1.default.createElement("div", { style: { marginLeft: "16px" } },
        react_1.default.createElement(core_1.Typography, { style: { fontWeight: "bold" } }, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.symbol),
        react_1.default.createElement(core_1.Typography, { color: "textSecondary", style: { fontSize: "14px" } }, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.name)));
}
