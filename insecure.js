const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

// ⚠️ Dangerous eval usage
app.get('/eval', (req, res) => {
  eval(req.query.code);
  res.send("Executed!");
});

// ⚠️ Command injection via child_process
const { exec } = require('child_process');
app.get('/exec', (req, res) => {
  exec(req.query.cmd, (err, stdout, stderr) => {
    res.send(stdout || stderr);
  });
});

// ⚠️ Insecure file access
app.get('/read', (req, res) => {
  fs.readFile(req.query.path, 'utf8', (err, data) => {
    res.send(data);
  });
});

// ⚠️ Hardcoded secret
const dbPassword = 'supersecret123'; // Should be in env vars

// ⚠️ Weak crypto
app.get('/hash', (req, res) => {
  const hash = crypto.createHash('md5').update(req.query.input).digest('hex');
  res.send(`MD5 hash: ${hash}`);
});

// ⚠️ Insecure headers
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Express'); // Reveals tech stack
  next();
});

app.listen(3000, () => console.log("Server running on port 3000"));
