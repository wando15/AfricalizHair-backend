const { PORT } = require("./config/server-config");
const server = require('./index')

server.listen(PORT, () => {
  console.log(`run port: ${PORT}`);
});