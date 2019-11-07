import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();
    const storage = __dirname + '/../storage/members.json';

    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(storage, (err, data) => {
            console.log(err);
            console.log(data.toString())
            res.send(data.toString()    );
        });
    });
    router.post('/add', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            const dict = {
                id: FSHelper.newId(jsonData),
                name: req.body.name,
                money: req.body.money
            };
            jsonData.push(dict);
            jsonData.sort((a: any, b: any) => {
                return a.id - b.id;
            });
            FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
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
            jsonData.sort((a: any, b: any) => {
                return a.id - b.id;
            })
            FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });

    router.post('/edit', (req: express.Request, res: express.Response) => {
        fs.readFile(__dirname + '/../storage/members.json', (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonData.length; i++) {
                if (req.body.id === jsonData[i].id) {
                    jsonData[i].money = parseInt(jsonData[i].money, 10) + parseInt(req.body.money, 10);
                    break;
                }
            }
            FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });

    app.use('/members', router);
}
