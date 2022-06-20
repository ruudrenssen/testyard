const languageCultureList = require('../../data/tables/language-culture-names-list.json');
const numberModel = require('../../data/tables/numbers.json');

const tables = [];

const buildTable = function (model) {
    const options = model.options;
    const rows = languageCultureList.map(culture => culture.cultureInfoCode);
    const table = {
        caption: model?.caption,
        value: model?.value,
        format: model?.intl,
        header: [],
        body: [],
        footer: []
    }

    table.body = rows.map(row => {
        const rowValues = [];
        rowValues.push(row);
        
        options.forEach(option => {
            rowValues.push(option.values.map(value => value));
        });

        return rowValues;
    });

    return table;
}

tables.push(buildTable(numberModel));

console.log(tables[0]);

module.exports = { tables };
