"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var fs = __importStar(require("fs"));
var fs_helper_1 = __importDefault(require("../fs_helper"));
exports.register = function (app) {
    var router = express.Router();
    router.post('/edit', function (req, res) {
        console.log('pipka');
        fs.readFile(__dirname + '/../storage/options.json', function (err, data) {
            var jsonData = JSON.parse(data.toString());
            jsonData.cost_update_delay = req.body.cost_update_delay;
            jsonData.bidding_time_period = req.body.bidding_time_period;
            fs_helper_1.default.saveToFile(__dirname + '/../storage/options.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    app.use('/options', router);
};
