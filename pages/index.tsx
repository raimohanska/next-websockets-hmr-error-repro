import { useEffect } from "react";

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  useEffect(() => {
    let ws = new WebSocket(`ws://localhost:3000/myspecialsocket`);
    ws.addEventListener("open", () => {
      console.log("Socket connected");
    });
    ws.addEventListener("message", (msg) => {
      console.log("Received websocket message", msg);
    });
    ws.addEventListener("error", () => {
      console.log("WebSocket error");
    });
    ws.addEventListener("close", () => {
      console.log("WebSocket close");
    });
  }, []);
  return <div>Next.js HRM Websocket Issue Reproduction</div>;
}
