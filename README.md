Codebase for reproducing a Next.js + espress-ws HMR issue.

How to reproduce:

1. Clone this repository
2. Install dependencies `npm install` or `yarn install`
3. Start Next.js in development mode `npm run dev` or `yarn dev`
4. Connect your browser to http://localhost:3000/
5. Observe WebSocket errors on both server console and browser console

The errors only occur when `express-ws` is initialized in server/server.ts.

Based on [Next.js](https://nextjs.org/) template to use when reporting a [bug in the Next.js repository](https://github.com/vercel/next.js/issues).
