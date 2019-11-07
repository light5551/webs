import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();
    const storage = __dirname + '/../storage/securities.json';

    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(storage, (err, data) => {
            res.send(data.toString());
        });
    });

    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(storage, (err, data) => {
            res.send(data.toString());
        });
    });
    router.post('/add', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            const dict = {
                id: FSHelper.newId(jsonData),
                company: req.body.company,
                number: req.body.number,
                distribution: req.body.distribution,
                start_price: req.body.start_price
            };
            jsonData.push(dict);
            jsonData.sort((a: any, b: any) => {
                return a.id - b.id;
            })
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
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
            jsonData.sort((a: any, b: any) => {
                return a.id - b.id;
            })
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
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
        res.send('{ "status": 200 }');
    });

    app.use('/securities', router);
}