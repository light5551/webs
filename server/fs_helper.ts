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
}
