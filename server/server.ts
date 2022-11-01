import express from "express";
import next from "next";
import * as Http from "http";
import * as WS from "ws";
import expressWs from "express-ws";
import { parse } from "url";

const port = parseInt(process.env.PORT || "3000");
const dev = process.env.NODE_ENV !== "production";
const app = express();
let http = new Http.Server(app);
const nextApp = next({ dev });
const nextJsHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  /* 
    Using express-ws causes the Next.js HMR issue to manifest.
    If you switch to plain `ws`, the application works just fine.

  */
  setupWebsocketsUsingExpressWs();
  //setupWebsocketsUsingWs();

  app.all("*", (req, res) => {
    console.log("Request to Next.js", req.url);
    return nextJsHandle(req, res);
  });

  http.listen(3000, () => console.log(`Listening at http://localhost:${port}`));
});

function setupWebsocketsUsingExpressWs() {
  const ws = expressWs(app, http, { leaveRouterUntouched: true });
  ws.app.ws("/myspecialsocket", (ws, req) => {
    console.log("Socket connected");
    ws.send("Welcome to the socket");
  });
}

function setupWebsocketsUsingWs() {
  const wss = new WS.WebSocketServer({
    noServer: true,
  });

  http.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url!);
    if (pathname === "/myspecialsocket") {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        console.log("Socket connected");
        ws.send("Welcome to the socket");
      });
    }
  });
}
