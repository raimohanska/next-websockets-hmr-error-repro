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
  app.all("*", (req, res) => {
    console.log("Request to Next.js", req.url);
    return nextJsHandle(req, res);
  });

  // Comment out the following to fix HMR
  expressWs(app, http, { leaveRouterUntouched: true });

  http.listen(3000, () => console.log(`Listening at http://localhost:${port}`));
});
