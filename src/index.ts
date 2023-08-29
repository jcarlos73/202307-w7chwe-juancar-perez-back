import chalk from "chalk";
import debugCreator from "debug";
import "dotenv/config";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;

const mongoDbUrl = process.env.DATBASE_URL!;

const debug = debugCreator("robots:server:start");

try {
  await connectToDatabase(mongoDbUrl);
  debug(chalk.green("Connected to database"));

  startServer(+port);
} catch (error) {
  debug(chalk.red("Couldn't connect to database"));
  debug(chalk.red((error as Error).message));

  process.exit(1);
}
