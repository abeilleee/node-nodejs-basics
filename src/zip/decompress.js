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
const ARCHIVE_PATH = path.join(__dirname, TARGET_FOLDER, ARCHIVE_NAME);

const decompress = async () => {
    const gunzip = zlib.createGunzip();
    const source = fs.createReadStream(ARCHIVE_PATH);
    const dest = fs.createWriteStream(FILE_PATH);

    try {
        await pipeline(source, gunzip, dest);
        console.log("File successfully decompressed");
    } catch (error) {
        console.error("Error occured: ", error);
    }
};

await decompress();
