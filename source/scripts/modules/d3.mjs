import * as d3 from "d3";

class D3 {
  constructor(element) {
    this.data = {};
    this.element = element;
    this.init();
  }

  async init() {
    this.data = await D3.loadData("Driver");

    D3.tabulate(this.element, this.data);
  }

  static tabulate(element, data) {
    console.log(data);
    const headers = ["a", "b", "c", "d"];

    let table = d3.select(element)
      , thead = table.append("thead");

    thead.append("tr")
      .selectAll("th")
      .data(headers)
      .enter()
      .append("th")
      .text(function (headers) { return headers; });

    return table;
  }

  static async loadData(category, offset = 0, limit = 100, data = []) {
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
      return data;
    } else {
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
