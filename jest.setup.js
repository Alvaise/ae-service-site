import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// --- Configurazione Polyfill Esistente ---
if (typeof global.Request === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Request, Response, Headers, fetch } = require("cross-fetch");
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.fetch = fetch;
}

// --- NUOVO FIX PER RESPONSE.JSON ---
// Next.js usa Response.json(), ma cross-fetch/jsdom potrebbero non averlo.
// Lo aggiungiamo manualmente.
if (global.Response && !global.Response.json) {
  global.Response.json = (data, init) => {
    return new global.Response(JSON.stringify(data), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init && init.headers),
      },
    });
  };
}
