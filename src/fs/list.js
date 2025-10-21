import path from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_PATH = path.join(__dirname, TARGET_FOLDER);
const ERROR_MSG = "FS operation failed";
const NO_ENTRY = "ENOENT";

const list = async () => {
    try {
        const filesNames = await fs.readdir(TARGET_PATH);
        console.log(filesNames);
    } catch (error) {
        if (error.code === NO_ENTRY) {
            throw new Error(ERROR_MSG);
        }

        console.error("Error occured: ", error);
    }
};

await list();
