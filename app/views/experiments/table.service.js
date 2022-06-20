const languageCultureList = require('../../data/tables/language-culture-names-list.json');
const numberModel = require('../../data/tables/numbers.json');

const tables = [];

const getColgroups = function (options) {
  const colgroups = [['col']]; // start with a colgroup for the first cell that serves as header

  options.forEach(option => colgroups.push(option.values.map(value => 'col')));

  return colgroups;
}

const buildTable = function (model) {
  const rows = languageCultureList;

  const table = {
    caption: model?.caption,
    colgroups: getColgroups(model.options),
    value: model?.value,
    format: model?.intl,
    header: undefined,
    body: undefined,
    footer: undefined
  }

  table.body = rows.map(row => {
    const rowValues = [];
    rowValues.push([row]);

    model.options.forEach(option => {
      rowValues.push(option.values.map(optionValue => {
        const key = option.property;

        if (optionValue?.attributes) {
          return new Intl.NumberFormat(row.cultureInfoCode, {
            [key]: optionValue.value,
            ...optionValue.attributes
          }).format(model.value);
        } else {
          return new Intl.NumberFormat(row.cultureInfoCode, {
            [key]: optionValue
          }).format(model.value);
        }
      }));
    });

    return rowValues;
  });

  return table;
}

tables.push(buildTable(numberModel));

module.exports = { tables };
