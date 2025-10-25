import path from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_NAME = "fresh.txt";
const CONTENT = "I am fresh and young";
const ERROR_MSG = "FS operation failed";

const create = async () => {
    try {
        const filePath = path.join(__dirname, "files", FILE_NAME);
        await fs.writeFile(filePath, CONTENT, {
            flag: "wx",
        });
    } catch (error) {
        if (error.code === "EEXIST") {
            throw new Error(ERROR_MSG);
        }
        console.error("Error occured: ", error);
    }
};

await create();
