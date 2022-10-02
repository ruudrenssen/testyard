import * as d3 from "d3";

import F1Data from "./f1-data.mjs";

class D3 {
  constructor(element) {
    this.data = {};
    this.element = element;
    this.init();
  }

  async init() {
    this.data = await F1Data.loadGP(2022, 17);

    console.log(JSON.stringify(this.data));
  }

  static tabulate(element, data) {
    const columns = Object.keys(data[0]);

    let table = d3.select(element).append("table")
      ,caption = table.append("caption")
      ,colgroup = table.append("colgroup")
      ,thead = table.append("thead")
      ,tbody = table.append("tbody");

    caption.append("span").text("Circuits");

    colgroup.selectAll("col")
      .data(columns)
      .enter()
      .append("col");

    thead.append("tr")
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
      .text(function (columns) { return columns; });

    let rows = tbody.selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

    rows.selectAll("td")
      .data(function (row) {
        return columns.map(function (column) {
          return { column: column, value: row[column] };
        });
      })
      .enter()
      .append("td")
      .text(function (d) {
        return d.value;
      });

    return table;
  }
}

export default D3;
