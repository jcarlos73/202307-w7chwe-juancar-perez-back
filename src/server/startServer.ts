import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("robots:start:server");
const startServer = (port: number) => {
  app.listen(port, () => {
    debug(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
