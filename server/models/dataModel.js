// Reading File
const fs = require('fs').promises;

class Data {
    #id
    #title
    #description
    #datetime
    #image

    static async getAllList() {
        try {
            // Reading file mock.json
            const jsonString = await fs.readFile('C:\\TestExambrisk\\mock.json', 'utf8');
            const data = JSON.parse(jsonString);
            return data;
        } catch (error) {
            return null;
        }
    }
}

module.exports = Data