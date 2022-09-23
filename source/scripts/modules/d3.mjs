import * as d3 from "d3";

class D3 {
  constructor(element) {
    this.data = {};
    this.element = element;
    this.init();
  }

  async init() {
    this.data = await D3.loadData("drivers");

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

  static async loadData(url, offset = 0, limit = 100, data = []) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    const response = await fetch(`http://ergast.com/api/f1/${url}.json?limit=${limit}&offset=${offset}`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error("error", error));

    data = [
      ...data,
      ...response.MRData.DriverTable.Drivers
    ]

    console.log(response.MRData);

    if(Number(response.MRData.total) < limit + offset) {
      return data;
    } else {
      offset += limit;
      return await D3.loadData(url, offset, limit, data);
    }
  }
}

export default D3;
