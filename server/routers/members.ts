import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();

    router.post('/add', (req: express.Request, res: express.Response) => {
        fs.readFile(__dirname + '/../storage/members.json', (err, data) => {
            const jsonData = JSON.parse(data.toString());
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    return;
                }
            }
            const dict = {
                id: req.body.id,
                name: req.body.name,
                money: req.body.money
            };
            jsonData.push(dict);
            FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    router.post('/del', (req: express.Request, res: express.Response) => {
        fs.readFile(__dirname + '/../storage/members.json', (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData.splice(i, 1);
                    break;
                }
            }
            FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('ok');
    });

    app.use('/members', router);
}
