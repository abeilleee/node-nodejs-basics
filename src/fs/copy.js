import path from "path";
import fs, { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = "files";
const DEST_DIR_NAME = "files_copy";
const ERROR_MSG = "FS operation failed";
const ERROR_CODES = {
    NOT_EXISTS: "ERR_FS_CP_EEXIST",
    NO_ENTRY: "ENOENT",
};

const copy = async () => {
    try {
        const source = path.join(__dirname, SOURCE_DIR);
        const dest = path.join(__dirname, DEST_DIR_NAME);

        await access(source);
        await fs.cp(source, dest, {
            force: false,
            recursive: true,
            errorOnExist: true,
        });
    } catch (error) {
        if (
            error.code === ERROR_CODES.NO_ENTRY ||
            error.code === ERROR_CODES.NOT_EXISTS
        ) {
            throw new Error(ERROR_MSG);
        }

        console.error("Error occured: ", error);
    }
};

await copy();
