const app = require("./app");

const portNumber = 9000;

app.listen(portNumber, () => {
  console.info(`Serving on: http://localhost:${portNumber}`);
});
