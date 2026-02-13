import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirInputs = join(__dirname, 'inputs');

if (!existsSync(dirInputs)) {
  mkdirSync(dirInputs, { recursive: true });
}

// Creates a temporary file with user's code content
const generateInputFile = (input) => {
  const jobID = uuid();
  const input_filename = `${jobID}.txt`;
  const input_filePath = join(dirInputs, input_filename);
  writeFileSync(input_filePath, input);
  return input_filePath;
};

export default generateInputFile;