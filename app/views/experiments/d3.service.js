// import fetch from "node-fetch";

// const delay = async function(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

// const loadData = async function(category, offset = 0, limit = 100, data = []) {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow"
//   };

//   const response = await fetch(`http://ergast.com/api/f1/${category}s.json?limit=${limit}&offset=${offset}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => result)
//     .catch((error) => console.error("error", error));

//   data = [
//     ...data,
//     ...response.MRData[`${category}Table`][`${category}s`]
//   ];

//   if(Number(response.MRData.total) < limit + offset) {
//     return data;
//   } else {
//     await delay(500); // rate limiter
//     offset += limit;
//     return await loadData(category, offset, limit, data);
//   }
// };

// const drivers = async () => await loadData("Driver");

// export const data = drivers;
