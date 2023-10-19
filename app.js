// Create the endpoint for your webhook

app.post("/webhook", (req, res) => {
  let body = req.body;

  console.log(`\u{2764} Received webhook:`);
  console.dir(body, { depth: null });
    
...
