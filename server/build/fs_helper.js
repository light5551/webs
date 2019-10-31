"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var FSHelper = /** @class */ (function () {
    function FSHelper() {
    }
    FSHelper.saveToFile = function (path, data) {
        fs.writeFile(path, data, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success');
            }
        });
    };
    FSHelper.newId = function (jsonData) {
        var id = 1;
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < jsonData.length; i++) {
            if (id !== jsonData[i].id) {
                break;
            }
            id++;
        }
        return id;
    };
    return FSHelper;
}());
exports.default = FSHelper;
