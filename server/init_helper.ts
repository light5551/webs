import * as fs from 'fs';

export default class FSHelper {
    static appendFiles() {
        if (!fs.existsSync(__dirname + '/storage')) {
            fs.mkdirSync(__dirname + '/storage');
        }

        if (!fs.existsSync(__dirname + '/storage/members.json')) {
            fs.appendFileSync(__dirname + '/storage/members.json', '[ ]');
        }

        if (!fs.existsSync(__dirname + '/storage/options.json')) {
            fs.appendFileSync(__dirname + '/storage/options.json', '{ "cost_update_delay": 50000, ' +
                '   "bidding_time_period": 1000000 }');
        }

        if (!fs.existsSync(__dirname + '/storage/securities.json')) {
            fs.appendFileSync(__dirname + '/storage/securities.json', '[ ]');
        }
    }
}
