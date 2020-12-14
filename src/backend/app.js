import express from "express";
import path from 'path';
import helmet from 'helmet';

import { dbConnection, register, models } from "./db/index.js";
import { createDatabase, createTables } from "./db/initializer.js";
import users from "./routes/users.js";
import mainPage from "./routes/mainPage.js";
import plants from "./routes/plants.js";
import plantsLists from "./routes/plantsLists.js";
import authExternal from "./routes/authExternal.js";

const app = express();

const connectToDB = async () => {
  await dbConnection.authenticate();

  console.log(`Connected to ${dbConnection.config.database}`);

  return dbConnection;
};

const runApp = async () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const activeDbConnection = await connectToDB();

  if (process.env.NODE_ENV === "test") {
    activeDbConnection.drop();
    await createDatabase();
    await createTables(dbConnection);
  }

  const dirname = path.resolve();

  register(app, dbConnection, models);

  app.use(helmet({
    contentSecurityPolicy: false
  }));
  app.use(express.static(path.join(dirname, "./public/")));
  app.use(express.static(path.join(dirname, "./build/")));
  app.use("/", mainPage);
  app.use("/api/users", users);
  app.use("/api/plants", plants);
  app.use("/api/plantsLists", plantsLists);
  app.use("/api/authexternal", authExternal);

  app.get("*", function (req, res) {
    res.sendFile(path.join(dirname + "/./build", "index.html"));
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

runApp();
