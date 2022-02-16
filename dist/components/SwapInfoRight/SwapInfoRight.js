"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapInfoRight = void 0;
var react_1 = __importDefault(require("react"));
require("./SwapInfoRight.css");
exports.SwapInfoRight = function (props) {
    var approximateValue = props.approximateValue, tokenValue = props.tokenValue;
    return (react_1.default.createElement("div", { className: 'swap__infoRight' },
        react_1.default.createElement("div", { className: 'swap__approximateValue' }, approximateValue),
        react_1.default.createElement("div", { className: 'swap__tokenValue' }, tokenValue)));
};
