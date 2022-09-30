import _ from "lodash";

const API_URL = "http://ergast.com/api/f1/";

class F1Data {
  static async loadData(category, offset = 0, limit = 100, data = { MRData: {}}) {
    const url = `${API_URL}${category}s.json?limit=${limit}&offset=${offset}`;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    console.info("api request", url, requestOptions);

    let response = await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error("error", error));

    data = F1Data.mergeDeep(data, response);

    if(limit + offset > Number(response.MRData.total)) {
      return data;
    } else {
      await F1Data.delay(500); // rate limiter
      offset += limit;
      return await F1Data.loadData(category, offset, limit, data);
    }
  }

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static mergeDeep(target, source) {
    const isObject = (obj) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = F1Data.mergeDeep(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });

    return target;
  }
}

export default F1Data;
