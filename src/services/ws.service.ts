import { secretHashKey } from "./../config/index";
import jwt from "jsonwebtoken";
import WebSocket, { Event, RawData } from "ws";
import http, { IncomingMessage } from "http";
import { WSMessage } from "models/ws";

interface IDecodedData {
  id: number;
  iat: number;
  exp: number;
}

export class WSService {
  public webSocketServer: WebSocket.Server<WebSocket.WebSocket>;
  private clients: { id: string; socket: WebSocket }[] = [];

  constructor(server: http.Server) {
    this.webSocketServer = new WebSocket.Server({ server });
    this.init();
  }

  init() {
    this.webSocketServer.on("connection", (ws: WebSocket, socket: any) => {
      const token = socket.url.split("token=")[1];
      if (token.length === 0 || token === "undefined") {
        ws.send("Auth error");
        return ws.close();
      }
      //прогблема с типами, verify ничего не возврщает
      const decoded: any = jwt.verify(
        token,
        secretHashKey,
        (error: Error, data: IDecodedData) => {
          if (error) {
            console.log("Error decoded");
            ws.close();
            return undefined;
          }
          return data;
        }
      );
      if (!decoded) {
        ws.send("Auth error");
        return ws.close();
      }
      ws.on("close", (ws: WebSocket) => {
        const ind = this.clients.indexOf(
          this.clients.find((s, index) => s.id == decoded.id && index)
        );
        this.clients = this.clients.slice(ind, ind);
      });

      // console.log(this.webSocketServer.clients, socket.client);
      this.clients.push({ id: decoded.id, socket: ws });
      ws.on("message", (m: RawData) => this.onMessage(m, ws));
      ws.on("error", (e: Error) => ws.send(e));

      const sendDate = JSON.stringify({
        status: 0,
        data: { name: "Connection open" },
      });
      ws.send(sendDate);
    });
  }
  onOpen() {}
  onMessage(m: RawData, ws: WebSocket) {
    console.log("message");
  }
  async sendMessage(id: string, message: WSMessage) {
    try {
      // const receiver = await redisService.getRedisItem(id);
      const receiver = this.clients.find((s) => {
        return s.id == id;
      });

      if (!receiver) {
        return console.log("User not connected");
      }
      receiver.socket.send("soo");
    } catch (error) {
      return console.log(error);
    }
  }
}
