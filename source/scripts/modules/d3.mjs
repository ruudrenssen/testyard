import * as d3 from "d3";

class D3 {
  constructor(element) {
    this.data = {};
    this.element = element;
    this.init();
  }

  async init() {
    this.data = await D3.loadData("Circuit");

    D3.tabulate(this.element, this.data);
  }

  static tabulate(element, data) {
    console.log(data);
    const columns = Object.keys(data[0]);

    let table = d3.select(element)
        .append("table")
      , caption = table.append("caption")
      , thead = table.append("thead")
      , tbody = table.append("tbody")
      , tfoot = table.append("tfoot");

    caption.append("span").text("Hallo");

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

  static async loadData(category, offset = 0, limit = 100, data = []) {
    console.info("fetch data");

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetch(`http://ergast.com/api/f1/${category}s.json?limit=${limit}&offset=${offset}`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error("error", error));

    data = [
      ...data,
      ...response.MRData[`${category}Table`][`${category}s`]
    ];

    if(Number(response.MRData.total) < limit + offset) {
      console.info("finished loading", data);
      return data;
    } else {
      console.info("fetch next set");
      await D3.delay(500); // rate limiter
      offset += limit;
      return await D3.loadData(category, offset, limit, data);
    }
  }

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default D3;
