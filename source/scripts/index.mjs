import AdvancedTable from './modules/advanced-table.mjs';

const tableEl = document.querySelector("table[data-module='table']");
if(tableEl) {
  const advancedTable = new AdvancedTable(tableEl);
}