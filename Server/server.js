const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec, spawn } = require("child_process");
const cors = require("cors");
const os = require("os");

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://codebasse.vercel.app'],
}));

app.use(bodyParser.json());

app.post("/run", (req, res) => {
  const code = req.body.code;
  const input = req.body.input || ""; // input string sent by frontend for scanf

  if (!code) {
    return res.status(400).json({ output: "No code provided", hasError: true });
  }

  // Save code to file
  fs.writeFileSync("main.c", code);

  const isWindows = os.platform() === "win32";
  const executableName = isWindows ? "main.exe" : "./main";
  const compileCmd = isWindows
    ? "gcc main.c -o main.exe && main.exe"
    : "gcc main.c -o main && ./main";

  // Step 1: Compile the code
  exec(compileCmd, (compileErr, _, compileStderr) => {
    if (compileErr) {
      // Compilation failed
      fs.unlinkSync("main.c");
      return res.json({
        output: compileStderr || compileErr.message,
        hasError: true,
        executionTime: 0,
      });
    }

    // Step 2: Run the compiled program with input piped to stdin
    const start = Date.now();

    const child = spawn(executableName, []);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (err) => {
      return res.json({
        output: err.message,
        hasError: true,
        executionTime: 0,
      });
    });

    child.on("close", (code) => {
      const end = Date.now();
      const executionTime = end - start;

      // Clean up files
      try {
        fs.unlinkSync("main.c");
        if (isWindows) fs.unlinkSync("main.exe");
        else fs.unlinkSync("main");
      } catch (cleanupErr) {
        console.warn("Cleanup failed:", cleanupErr.message);
      }

      if (code !== 0) {
        return res.json({
          output: stderr || `Process exited with code ${code}`,
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

    // Write input to the program's stdin and close stdin
    child.stdin.write(input);
    child.stdin.end();
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
