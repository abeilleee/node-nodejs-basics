import path from "path";
import fs from "node:fs";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FOLDER = "files";
const TARGET_FILE = "fileToCompress.txt";
const ARCHIVE_NAME = "archive.gz";
const FILE_PATH = path.join(__dirname, TARGET_FOLDER, TARGET_FILE);
const DEST_PATH = path.join(__dirname, TARGET_FOLDER, ARCHIVE_NAME);

const compress = async () => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(FILE_PATH);
    const dest = fs.createWriteStream(DEST_PATH);

    try {
        await pipeline(source, gzip, dest);
        console.log("File successfully compressed");
    } catch (error) {
        console.error("Error occured: ", error);
    }
};

await compress();
