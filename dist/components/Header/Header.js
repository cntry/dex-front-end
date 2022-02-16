"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
require("./Header.css");
var core_1 = require("@material-ui/core");
var react_1 = __importDefault(require("react"));
var useStyles = core_1.makeStyles(function (theme) { return ({
    header__wallet_icon: {
        marginRight: "4px",
        marginBottom: "2px",
    },
    header__swap_button: {
        width: "100%",
        borderRadius: theme.spacing(2),
        // backgroundColor: theme.palette.primary.main,
        // backgroundColor: "#2196F3",
        // color: theme.palette.primary.contrastText,
        fontSize: 14,
        lineHeight: "22px",
        // padding: theme.spacing(1.5),
        cursor: "pointer",
    },
}); });
exports.Header = function (props) {
    var isConnected = props.isConnected, wallet = props.wallet;
    var styles = useStyles();
    return (react_1.default.createElement("section", { className: "header" },
        react_1.default.createElement("img", { src: "logo.svg", alt: "logo" }),
        react_1.default.createElement("div", { className: "header__menu wrapper" },
            react_1.default.createElement("a", { href: "https://cntry.io/", className: "header__menu_punct link", target: "_blank", rel: "noreferrer" }, "home"),
            react_1.default.createElement("a", { href: "https://swap.cntry.io/", className: "header__menu_punct link header__menu_punct-active" }, "swap")),
        react_1.default.createElement("div", { className: "header__wallet wrapper" },
            react_1.default.createElement("img", { className: styles.header__wallet_icon, src: "wallet.svg", alt: "wallet" }),
            react_1.default.createElement("div", { className: styles.header__swap_button, onClick: function () { return (!isConnected ? wallet.connect() : wallet.disconnect()); } }, "Connect Wallet"))));
};
