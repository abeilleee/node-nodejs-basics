import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "fileToWrite.txt";
const FILE_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);

const write = async () => {
    const stream = fs.createWriteStream(FILE_PATH);

    process.stdin.on("data", (chunk) => {
        stream.write(chunk);
    });

    process.stdin.on("end", () => {
        stream.end();
    });

    process.stdin.on("error", (error) => {
        console.error(error);
    });
};

await write();
