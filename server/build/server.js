"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_helper_1 = __importDefault(require("./init_helper"));
var express_1 = __importDefault(require("express"));
var port = 4201;
var host = '127.0.0.1';
var app = express_1.default();
init_helper_1.default.appendFiles();
init_helper_1.default.configureRouters(app);
app.listen(port, host, function () {
    console.log('Server started');
});
