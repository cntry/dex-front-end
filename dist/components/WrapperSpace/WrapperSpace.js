"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperSpace = void 0;
var react_1 = __importDefault(require("react"));
require("./WrapperSpace.css");
exports.WrapperSpace = function (props) {
    return (react_1.default.createElement("div", { className: "wrapper__space" }, props.children));
};
