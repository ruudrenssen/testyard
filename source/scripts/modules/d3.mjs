import * as d3 from "d3";

class D3 {
  constructor(element) {
    this.data = {};
    this.element = element;
    this.init();
  }

  async init() {
    this.data = await D3.loadData("circuits");

    D3.tabulate(this.element, this.data);
  }

  static tabulate(parent, data) {
    console.log(data);
    const headers = ["a", "b", "c", "d"];

    let table = d3.select(parent)
      , thead = table.append("thead")
      , tbody = table.append("tbody");

    thead.append("tr")
      .selectAll("th")
      .data(headers)
      .enter()
      .append("th")
      .text(function (headers) { return headers; });

    return table;
  }

  static async loadData(url, limit = 30, offset = 0 ) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    return fetch(`http://ergast.com/api/f1/${url}.json?limit=${limit}&offset=${offset}`, requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => console.error("error", error));
  }
}

export default D3;
