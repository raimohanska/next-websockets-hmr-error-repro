Codebase for reproducing a Next.js + espress-ws HMR issue.

## The problem

When using Next.js 13, Express and express-ws, the HMR (hot module replacement) implementation in
Next.js breaks down with WebSocket errors

## The cause

This happens because express-ws captures all HTTP->WebSocket upgrade events instead of only those that
match some of the WebSocket routes that the application has configured.

## How to reproduce

1. Clone this repository
2. Install dependencies `npm install` or `yarn install`
3. Start Next.js in development mode `npm run dev` or `yarn dev`
4. Connect your browser to http://localhost:3000/
5. Observe WebSocket errors on both server console and browser console

The errors only occur when `express-ws` is initialized in server/server.ts.

## Workaround

In many use cases, you only need one websocket handler or at least don't need a full blown routing system
for WebSocket handlers. See the simple solution using only the `ws` library, in the `setupWebsocketsUsingWs`
method in [server.ts](server/server.ts).
