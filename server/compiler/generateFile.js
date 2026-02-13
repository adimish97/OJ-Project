import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirCodes = join(__dirname, 'codes');

if (!existsSync(dirCodes)) {
  mkdirSync(dirCodes, { recursive: true });
}

// Creates a temporary file with user's code content
const generateFile = (language, code) => {
  const jobID = uuid();
  const filename = `${jobID}.${language}`;
  const filePath = join(dirCodes, filename);
  writeFileSync(filePath, code);
  return filePath;
};

export default generateFile;