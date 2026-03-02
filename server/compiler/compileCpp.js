import { exec } from "child_process";
import path from "path";
import fs from "fs";

const compileCpp = (filePath) => {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(process.cwd(), "compiler", "outputs");

    // Ensure output folder exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = path.basename(filePath, ".cpp");
    const exePath = path.join(outputDir, `${fileName}.exe`);

    exec(`g++ "${filePath}" -o "${exePath}"`, (err, stdout, stderr) => {
      if (err) {
        return reject(new Error(stderr || "Compilation Error"));
      }

      resolve(exePath);
    });
  });
};

export default compileCpp;
