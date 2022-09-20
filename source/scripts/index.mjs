import AdvancedTable from './modules/advanced-table.mjs';
import D3 from './modules/d3.mjs';

const tableEl = document.querySelector("table[data-module='advanced-table']");
if(tableEl) new AdvancedTable(tableEl);

const d3El = document.querySelector("div[data-module='d3']");
if(d3El) new D3(d3El);
