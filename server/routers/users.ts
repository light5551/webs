import * as express from 'express';
import * as fs from 'fs';
import FSHelper from '../fs_helper';

export const register = ( app: express.Application ) => {
    const router = express.Router();
    const storage = __dirname + '/../storage/users.json';

    router.get('/', (req: express.Request, res: express.Response) =>  {
        fs.readFile(storage, (err, data) => {
            res.send(data.toString()    );
        });
    });
    router.post('/add', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            // tslint:disable-next-line:prefer-for-of
            const id = FSHelper.newId(jsonData);
            const dict = {
                id: id,
                uname: 'user'+id,
                password: 1
            };
            jsonData.push(dict);
            jsonData.sort((a: any, b: any) => {
                return a.id - b.id;
            });
            FSHelper.saveToFile(storage, JSON.stringify(jsonData));
        });
        res.send('{ "status": 200 }');
    });

    router.post('/login', (req: express.Request, res: express.Response) => {
        fs.readFile(storage, (err, data) => {
            const jsonData = JSON.parse(data.toString());
            for (let i = 0; i < jsonData.length; i++) {
                if(req.body.uname === jsonData[i].uname && req.body.password === jsonData[i].password)
                {
                    res.send('{ "id": ' + jsonData[i].id + '}');
                    return
                }
            }
        });
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

    app.use('/users', router);
}
