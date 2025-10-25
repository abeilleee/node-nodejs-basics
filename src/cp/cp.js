import path from "path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "script.js";
const FILE_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);

const spawnChildProcess = async (args) => {
    try {
        fork(FILE_PATH, args);
    } catch (error) {
        console.error("Error occured: ", error);
    }
};

spawnChildProcess(["someArgument1", "someArgument2", "someArgument3"]);
