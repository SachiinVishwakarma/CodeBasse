const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();

// Only allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(bodyParser.json());

// Fix: Correct syntax for GET route
app.get("/", (req, res) => {
  res.send("Hello, CodeBase!");
});

app.post("/run", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "No code provided" });
  }

  fs.writeFileSync("main.c", code);

  // Compile and execute C program on Windows
  exec("gcc main.c -o main.exe && main.exe", (err, stdout, stderr) => {
    if (err) {
      return res.json({ output: stderr || err.message });
    }
    return res.json({ output: stdout });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
