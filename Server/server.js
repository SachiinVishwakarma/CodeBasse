const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://codebasse.vercel.app/'], // replace with your frontend URL
}));

app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, CodeBase!");
});

// Run C code
app.post("/run", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ output: "No code provided" });
  }

  fs.writeFileSync("main.c", code);

  exec("gcc main.c -o main && ./main", (err, stdout, stderr) => {
    if (err) {
      return res.json({ output: stderr || err.message });
    }

    // Optional: clean up files to avoid buildup
    fs.unlinkSync("main.c");
    fs.unlinkSync("main");

    return res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
