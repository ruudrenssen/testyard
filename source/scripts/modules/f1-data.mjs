import { mergeDeep, delay } from "../utils.mjs";

const API_URL = "http://ergast.com/api/f1/";

class F1Data {
  static async loadDrivers() {
    const data =  await F1Data.loadData("Drivers");

    return data.MRData.DriverTable.Drivers;
  }

  static async loadData(category, offset = 0, limit = 100, data = { MRData: {}}) {
    const url = `${API_URL}${category}.json?limit=${limit}&offset=${offset}`;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

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
      return await F1Data.loadData(category, offset, limit, data);
    }
  }
}

export default F1Data;
