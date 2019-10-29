import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';
import {json} from "express";

export const register = ( app: express.Application ) => {
    const router = express.Router();
    const storage = __dirname + '/../storage/securities.json';

    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(storage, (err, data) => {
            res.send(data.toString());
        });
    });
    router.post('/add', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    return;
                }
            }
            const dict = {
                id: req.body.id,
                company: req.body.company,
                number: req.body.number,
                distribution: req.body.distribution,
                start_price: req.body.start_price
            };
            jsonData.push(dict);
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    router.post('/del', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData.splice(i, 1);
                    break;
                }
            }
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    router.post('/edit', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData[i].company = req.body.company;
                    jsonData[i].number = req.body.number;
                    jsonData[i].distribution = req.body.distribution;
                    jsonData[i].start_price = req.body.start_price;
                    break;
                }
            }
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    app.use('/securities', router);
}
