import path from "path";
import fs from "fs";

const logFile = path.resolve(__dirname, "../log.txt");

function log(message: string, err: any): void {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    if (message) msgToLog += message + "\n";
    if(typeof err === "string") msgToLog += err + "\n"; 
    if (err && err.message) msgToLog += `Message: ${err.message}\n`;
    if (err && err.stack) msgToLog += `Stack: ${err.stack}\n`;
    msgToLog += "----------------------------------------------------------------------------------------------------\n";
    fs.appendFile(logFile, msgToLog, () => { });
}

export default {
    log
};
