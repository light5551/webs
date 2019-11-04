import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();
    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(__dirname + '/../storage/options.json', (err, data) => {
            res.send(data.toString());
        });
    });
    router.post('/edit', (req: express.Request, res: express.Response) => {
        console.log('pipka')
        fs.readFile(__dirname + '/../storage/options.json', (err, data) => {
            const jsonData = JSON.parse(data.toString());
            jsonData.cost_update_delay = req.body.cost_update_delay;
            jsonData.bidding_time_period = req.body.bidding_time_period;
            FSHelper.saveToFile(__dirname + '/../storage/options.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });

    app.use('/options', router);
}