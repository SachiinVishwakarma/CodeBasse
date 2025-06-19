const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const os = require("os");

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://codebasse.vercel.app'],
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Code base");
});

app.post("/run", (req, res) => {
  const code = req.body.code;
  const input = req.body.input || "";

  if (!code) {
    return res.status(400).json({ output: "No code provided", hasError: true });
  }

  fs.writeFileSync("main.c", code);

  const isWindows = os.platform() === "win32";
  const executable = isWindows ? "main.exe" : "./main";
  const compileCmd = isWindows ? "gcc main.c -o main.exe" : "gcc main.c -o main";

  exec(compileCmd, (compileErr, _, compileStderr) => {
    if (compileErr) {
      fs.unlinkSync("main.c");
      return res.json({
        output: compileStderr || compileErr.message,
        hasError: true,
        executionTime: 0,
      });
    }

    const runCmd = isWindows ? `echo ${input} | ${executable}` : `echo \"${input}\" | ${executable}`;
    const start = Date.now();

    exec(runCmd, (runErr, stdout, stderr) => {
      const end = Date.now();
      const executionTime = end - start;

      try {
        fs.unlinkSync("main.c");
        if (isWindows) fs.unlinkSync("main.exe");
        else fs.unlinkSync("main");
      } catch (cleanupErr) {
        console.warn("Cleanup failed:", cleanupErr.message);
      }

      if (runErr) {
        return res.json({
          output: stderr || runErr.message,
          hasError: true,
          executionTime,
        });
      }

      return res.json({
        output: stdout || "No output.",
        hasError: false,
        executionTime,
      });
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));