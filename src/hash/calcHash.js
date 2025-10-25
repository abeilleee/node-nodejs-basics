import path from "path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "fileToCalculateHashFor.txt";
const FILE_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);

const calculateHash = async () => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(FILE_PATH);

    stream.on("data", (chunk) => {
        hash.update(chunk);
    });

    stream.on("end", () => {
        const result = hash.digest("hex");
        console.log(result);
    });

    stream.on("error", (error) => {
        console.error(error);
    });
};

await calculateHash();
