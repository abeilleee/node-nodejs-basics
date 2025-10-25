import path from "path";
import fs, { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "wrongFilename.txt";
const NEW_FILE_NAME = "properFilename.md";
const ERROR_MSG = "FS operation failed";
const NO_ENTRY = "ENOENT";

const oldPath = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);
const newPath = path.join(__dirname, TARGET_FOLDER, NEW_FILE_NAME);

const isFileExists = async (filePath) => {
    try {
        await access(filePath);
        return true;
    } catch (error) {
        if (error.code === NO_ENTRY) {
            return false;
        }

        console.error("Error occured: ", error);
    }
};

const rename = async () => {
    try {
        const isNewFileExists = await isFileExists(newPath);
        const isTargetFileExists = await isFileExists(oldPath);

        if (isNewFileExists || !isTargetFileExists) {
            throw new Error(ERROR_MSG);
        }

        await fs.rename(oldPath, newPath);
    } catch (error) {
        console.error(error);
    }
};

await rename();
