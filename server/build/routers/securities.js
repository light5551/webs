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
    var storage = __dirname + '/../storage/securities.json';
    router.get('/', function (req, res) {
        fs.readFile(storage, function (err, data) {
            res.send(data.toString());
        });
    });
    router.post('/add', function (req, res) {
        fs.readFile(storage, function (err, data) {
            var jsonData = JSON.parse(data.toString());
            var dict = {
                id: fs_helper_1.default.newId(jsonData),
                company: req.body.company,
                number: req.body.number,
                distribution: req.body.distribution,
                start_price: req.body.start_price
            };
            jsonData.push(dict);
            jsonData.sort(function (a, b) {
                return a.id - b.id;
            });
            fs_helper_1.default.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    router.post('/del', function (req, res) {
        fs.readFile(storage, function (err, data) {
            var jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData.splice(i, 1);
                    break;
                }
            }
            jsonData.sort(function (a, b) {
                return a.id - b.id;
            });
            fs_helper_1.default.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    router.post('/edit', function (req, res) {
        fs.readFile(storage, function (err, data) {
            var jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData[i].company = req.body.company;
                    jsonData[i].number = req.body.number;
                    jsonData[i].distribution = req.body.distribution;
                    jsonData[i].start_price = req.body.start_price;
                    break;
                }
            }
            fs_helper_1.default.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    app.use('/securities', router);
};
