import { exec } from "child_process";
import fs from "fs";

const executeCpp = (exePath, inputFilePath) => {
  return new Promise((resolve, reject) => {
    exec(`${exePath} < ${inputFilePath}`, { timeout: 2000 }, (err, stdout, stderr) => {
      if (err) {
        if (err.killed) return reject(new Error("Time Limit Exceeded"));
        return reject(new Error("Runtime Error"));
      }
      resolve(stdout);
    });
  });
};

export default executeCpp;
