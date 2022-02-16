"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapApproximately = void 0;
var react_1 = __importDefault(require("react"));
require("./SwapApproximately.css");
exports.SwapApproximately = function (_a) {
    var digits = _a.digits;
    return (react_1.default.createElement("div", { className: "swap__approximately" }, digits));
};
