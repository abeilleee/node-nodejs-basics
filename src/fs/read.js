import path from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "fileToRead.txt";
const ERROR_MSG = "FS operation failed";
const NO_ENTRY = "ENOENT";
const TARGET_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);

const read = async () => {
    try {
        const fileContent = await fs.readFile(TARGET_PATH, {
            encoding: "utf8",
        });
        console.log(fileContent);
    } catch (error) {
        if (error.code === NO_ENTRY) {
            throw new Error(ERROR_MSG);
        }

        console.error("Error occured: ", error);
    }
};

await read();
