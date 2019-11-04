import * as fs from 'fs';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import * as memRouter from './routers/members';
import * as optionsRouter from './routers/options';
import * as secursRouter from './routers/securities';
import * as usersRouter from './routers/users';

export default class FSHelper {
    static appendFiles() {
        if (!fs.existsSync(__dirname + '/storage')) {
            fs.mkdirSync(__dirname + '/storage');
        }

        if (!fs.existsSync(__dirname + '/storage/members.json')) {
            fs.appendFileSync(__dirname + '/storage/members.json', '[ ' +
                '{"id":1, "name": "Государкин Ярослав", "money": 15000}, ' +
                '{"id":2, "name": "Ленивец Сид", "money": 100000}, ' +
                '{"id":3, "name": "Билли Бонс", "money": 2000000}, ' +
                '{"id":4, "name": "Борис Бритва", "money": 53000000}, ' +
                '{"id":5, "name": "Пещера Чудес", "money": 10000000000} ' +
                ']');
        }

        if (!fs.existsSync(__dirname + '/storage/users.json')) {
            fs.appendFileSync(__dirname + '/storage/users.json', '[ ' +
                '{"id":0, "uname": "admin", "password": "admin"}, ' +
                '{"id":1, "uname": "user1", "password": "1"}, ' +
                '{"id":2, "uname": "user2", "password": "1"}, ' +
                '{"id":3, "uname": "user3", "password": "1"}, ' +
                '{"id":4, "uname": "user4", "password": "1"}, ' +
                '{"id":5, "uname": "user5", "password": "1"}, ' +
                ']');
        }

        if (!fs.existsSync(__dirname + '/storage/options.json')) {
            fs.appendFileSync(__dirname + '/storage/options.json', '{ "cost_update_delay": 50000, ' +
                '   "bidding_time_period": 1000000 }');
        }

        if (!fs.existsSync(__dirname + '/storage/securities.json')) {
            fs.appendFileSync(__dirname + '/storage/securities.json', '[ {"id":1,"company":"Gazpromchik","number":1500,"distribution":"normal","start_price":4000},' +
                '{"id":2,"company":"Uruandex","number":8300,"distribution":"puasson","start_price":2000},' +
                '{"id":3,"company":"OOO Sinyak","number":4760,"distribution":"normal","start_price":1700},' +
                '{"id":4,"company":"Gazmyas","number":1300,"distribution":"puasson","start_price":4000},' +
                '{"id":5,"company":"Ust-Tech","number":2500,"distribution":"normal","start_price":2600}]');
        }
    }

    static configureRouters(app: express.Application) {
        const corsOptions = this.configureCORS();
        app.use(cors(corsOptions));

        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json());

        memRouter.register(app);
        optionsRouter.register(app);
        secursRouter.register(app);
        usersRouter.register(app);

        app.use('*', cors(corsOptions));
    }

    static configureCORS() {
        const originsWhitelist = 'http://localhost:3000';
        const options: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: originsWhitelist,
            preflightContinue: false
        };
        return options;
    }
}