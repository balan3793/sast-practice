const express = require('express');
const app = express();

app.get('/eval', (req, res) => {
  eval(req.query.code); // ⚠️ Dangerous eval usage
  res.send("Executed!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
