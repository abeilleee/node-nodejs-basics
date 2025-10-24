import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "fileToRead.txt";
const FILE_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);

const read = async () => {
    const stream = fs.createReadStream(FILE_PATH);

    stream.on("data", (chunk) => {
        process.stdout.write(`${chunk}\n)`);
    });

    stream.on("error", (error) => {
        console.error(error);
    });
};

await read();
