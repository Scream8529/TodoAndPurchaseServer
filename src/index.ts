import express from "express";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import swaggerUi from "swagger-ui-express";
import http from "http";
import { WSService } from "./services/ws.service";

import Routes from "./routes";
import { serverConfig } from "./config";
import { env } from "process";
import dborm from "./db";

require("dotenv").config();

const PORT = process.env.PORT || serverConfig.port;

const app = express();
const server = http.createServer(app);

export const WsService = new WSService(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(Routes);

app.use(
  "/swagger/",
  swaggerUi.serve,
  swaggerUi.setup(undefined, { swaggerOptions: { url: "/swagger.json" } })
);

const startServer = () => {
  console.log(`app runnin on port ${PORT}`);
};

if (cluster.isMaster) {
  let cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.id} finished. Exit code: ${code}`);

    server.listen(PORT, startServer);
  });
} else {
  server.listen(PORT, startServer);
}
