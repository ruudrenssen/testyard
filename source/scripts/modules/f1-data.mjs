import { mergeDeep, delay } from "../utils.mjs";

const API_URL = "http://ergast.com/api/f1/";
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

class F1Data {
  static async loadGP(year = 1996, round = 1, lap) {
    if (year < 1996) return ["No GP info before 1996"];

    const endpoint = `${year}/${round}/laps${ lap ? ("/" + lap) : ""}`;
    const data =  await F1Data.loadData(endpoint);

    return data;
  }

  static async loadDrivers() {
    const data =  await F1Data.loadData("Drivers");

    return data.MRData.DriverTable.Drivers;
  }

  static async loadCircuits() {
    const data =  await F1Data.loadData("Circuits");

    return data.MRData.CircuitTable.Circuits;
  }

  static async loadData(endpoint, offset = 0, limit = 100, data = { MRData: {}}) {
    const url = `${API_URL}${endpoint}.json?limit=${limit}&offset=${offset}`;

    let response = await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error("error", error));

    data = mergeDeep(data, response);

    if(limit + offset > Number(response.MRData.total)) {
      return data;
    } else {
      await delay(500); // rate limiter
      offset += limit;
      return await F1Data.loadData(endpoint, offset, limit, data);
    }
  }
}

export default F1Data;
