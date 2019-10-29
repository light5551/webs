import * as fs from 'fs';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import * as memRouter from './routers/members';
import * as optionsRouter from './routers/options';
import * as secursRouter from './routers/securities';

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
            fs.appendFileSync(__dirname + '/storage/securities.json', '[ {"id":1,"company":"Gazpromchik","number":1500,"distribution":"normal","start_price":4000},' +
                '{"id":2,"company":"Uruandex","number":8300,"distribution":"puasson","start_price":2000},' +
                '{"id":3,"company":"Ust-Tech","number":2500,"distribution":"normal","start_price":2600}]');
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

        app.use('*', cors(corsOptions));
    }

    static configureCORS() {
        const originsWhitelist = 'http://localhost:4200';
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
