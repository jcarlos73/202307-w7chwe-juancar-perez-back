import chalk from "chalk";
import app from "./index.js";

const startServer = () => {
  const port = 4000;

  app.listen(port, () => {
    console.log(
      chalk.blue(`Listening on ${chalk.bold(`http://localhost:${port}`)}`),
    );
  });
};

export default startServer;
