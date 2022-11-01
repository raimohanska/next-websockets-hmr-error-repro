import express from "express";
import next from "next";
import * as Http from "http";
import expressWs from "express-ws";

const port = parseInt(process.env.PORT || "3000");
const dev = process.env.NODE_ENV !== "production";
const app = express();
let http = new Http.Server(app);
const nextApp = next({ dev });
const nextJsHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Comment out the following to fix HMR
  setupWebsockets();

  app.all("*", (req, res) => {
    console.log("Request to Next.js", req.url);
    return nextJsHandle(req, res);
  });

  http.listen(3000, () => console.log(`Listening at http://localhost:${port}`));
});

function setupWebsockets() {
  const ws = expressWs(app, http, { leaveRouterUntouched: true });
  ws.app.ws("/myspecialsocket", (ws, req) => {
    console.log("Socket connected");
    ws.send("Welcome to the socket");
  });
}
