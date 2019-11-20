var fs = require('fs');

module.exports = class FSHelper {
    static saveToFile(path, data) {
        fs.writeFile(path, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Success');
            }
        });
    }

    static newId(jsonData) {
        let id = 1;
        for (let i = 0; i < jsonData.length; i++) {
            if (id !== jsonData[i].id) {
                break;
            }
            id++;
        }
        return id;
    }
}
