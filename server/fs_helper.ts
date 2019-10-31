import * as fs from 'fs';

export default class FSHelper {
    static saveToFile(path: string, data: string) {
        fs.writeFile(path, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Success');
            }
        });
    }

    static newId(jsonData: any) {
        let id = 1;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (id !== jsonData[i].id) {
                break;
            }
            id++;
        }
        return id;
    }
}
