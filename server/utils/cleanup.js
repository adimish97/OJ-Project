import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change base folder here
const BASE_DIR = path.join(__dirname, "..", "compiler");

const ONE_HOUR = 60 * 60 * 1000;

const folders = [
  path.join(BASE_DIR, "codes"),
  path.join(BASE_DIR, "inputs"),
  path.join(BASE_DIR, "outputs"),
];

const cleanupOldFiles = () => {
  const now = Date.now();

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) return;

    fs.readdir(folder, (err, files) => {
      if (err) return console.error(err);

      files.forEach((file) => {
        const filePath = path.join(folder, file);

        fs.stat(filePath, (err, stats) => {
          if (err) return;

          const fileAge = now - stats.mtimeMs;

          if (fileAge > ONE_HOUR) {
            fs.unlink(filePath, (err) => {
              if (err) console.error(err);
              else console.log(`Deleted: ${filePath}`);
            });
          }
        });
      });
    });
  });
};

export default cleanupOldFiles;
