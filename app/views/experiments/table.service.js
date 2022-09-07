const languageCultureList = require('../../data/tables/language-culture-names-list.json');
const currencyModel = require('../../data/tables/currency.json');

const tables = [];

const getColgroups = function (options) {
  const colgroups = [['col']]; // start with a colgroup for the first cell that serves as header

  options.forEach(option => colgroups.push(option.options.map(value => 'col')));

  return colgroups;
}

const getHeaders = function(options) {
    const headers = [];

    options.forEach(option => {
      console.log(option);
      if (option.options[0]?.options) {
        // has nested options
        headers.push(...option.options.map(value => value.title));
      } else {
        headers.push(...option.options);
      }
    });

    return headers;
}

const buildTable = function (model) {
  const rows = languageCultureList;

  const table = {
    value: model?.value,
    format: model?.intl,
    caption: model?.caption,
    colgroups: getColgroups(model.options),
    header: getHeaders(model.options),
    body: undefined,
    footer: undefined
  }

  table.body = rows.map(row => {
    const rowValues = [];
    const value = model.value;
    
    rowValues.push([row]);

    model.options.forEach(option => {
      rowValues.push(option.options.map(optionValue => {
        const key = option.property;

        if (optionValue?.options) {
          return new Intl.NumberFormat(row.cultureInfoCode, {
            [key]: optionValue.value,
            ...optionValue.options
          }).format(value);
        } else {
          return new Intl.NumberFormat(row.cultureInfoCode, {
            [key]: optionValue
          }).format(value);
        }
      }));
    });

    return rowValues;
  });

  return table;
}

tables.push(buildTable(currencyModel));

module.exports = { tables };
