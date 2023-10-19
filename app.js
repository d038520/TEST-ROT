// Create the endpoint for your webhook

app.post("/webhook", (req, res) => {
  let body = req.body;

  console.log(`\u{2764} Received webhook:`);
  console.dir(body, { depth: null });
    
...
// Add support for GET requests to our webhook
app.get("/messaging-webhook", (req, res) => {
  
// Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === config.verifyToken) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
// Import dependencies and set up http server
const express = require("express"),
  bodyParser = require("body-parser"),
  { urlencoded, json } = require("body-parser"),
  app = express().use(bodyParser.json());
    
    ...


// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
