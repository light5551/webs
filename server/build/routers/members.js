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
    var storage = __dirname + '/../storage/members.json';
    router.get('/', function (req, res) {
        fs.readFile(storage, function (err, data) {
            res.send(data.toString());
        });
    });
    router.post('/add', function (req, res) {
        fs.readFile(storage, function (err, data) {
            var jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            var dict = {
                id: fs_helper_1.default.newId(jsonData),
                name: req.body.name,
                money: req.body.money
            };
            jsonData.push(dict);
            jsonData.sort(function (a, b) {
                return a.id - b.id;
            });
            fs_helper_1.default.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    router.post('/del', function (req, res) {
        fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
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
            fs_helper_1.default.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    router.post('/edit', function (req, res) {
        fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
            var jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData[i].money = parseInt(jsonData[i].money, 10) + parseInt(req.body.money, 10);
                    break;
                }
            }
            fs_helper_1.default.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });
    app.use('/members', router);
};
