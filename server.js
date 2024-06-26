const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//Configuration requires
const ConfigurationModel = require("./models/inputs.json");
const ConfigurationService = require("./services/ConfigurationService");
const ConfigurationController = require("./controllers/ConfigurationController");
const mongodbConnection = require("./db/mongodbConnection");

//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
);

mongodbConnection().then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Error connecting to MongoDB", error);
});


app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  //Routes 
  server.use("/api", require("./routes/user.js"));

  //get configuration by path
  server.get("/configuration/:path", (req, res) =>
    ConfigurationControllerInstance.get(req, res)
  );

  //DB connection


  server.post("/:path", (req, res) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});