import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();

    router.post('/edit', (req: express.Request, res: express.Response) => {
        fs.readFile(__dirname + '/../storage/options.json', (err, data) => {
            const jsonData = JSON.parse(data.toString());
            jsonData.cost_update_delay = req.body.cost_update_delay;
            jsonData.bidding_time_period = req.body.bidding_time_period;
            FSHelper.saveToFile(__dirname + '/../storage/options.json', JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    app.use('/options', router);
}
