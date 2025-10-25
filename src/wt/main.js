import path from "path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FILE = "worker.js";
const FILE_PATH = path.join(__dirname, TARGET_FILE);
const START_NUMBER = 10;

const createWorker = (path, data) => {
    return new Promise((resolve) => {
        const worker = new Worker(path, { workerData: data });

        worker.on("message", (message) => {
            resolve({ status: "resolved", data: message });
        });

        worker.on("error", () => {
            resolve({ status: "error", data: null });
        });
    });
};

const performCalculations = async () => {
    const coresNumber = os.cpus().length;
    const results = [];

    for (let i = 0; i < coresNumber; i++) {
        const worker = await createWorker(FILE_PATH, START_NUMBER + i);
        results.push(worker);
    }

    console.log(results);
};

await performCalculations();
