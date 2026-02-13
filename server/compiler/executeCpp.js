import { exec } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path, { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = join(__dirname, "outputs");

if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, input_filepath) => {
  return new Promise((resolve, reject) => {

    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${input_filepath}`,
      { timeout: 10000 }, // ⏱️ 5 seconds
      (error, stdout, stderr) => {
        if (error) {
          return reject(stderr || error.message);
        }
        resolve(stdout);
      }
    );
  });
};

export default executeCpp;
