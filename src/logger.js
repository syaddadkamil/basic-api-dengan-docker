import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "app.log");

const logFile = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}, ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) throw err;
    });
};

const log = (level, message) => {
    const logMessage = `[${level.toUpperCase()}] ${message}`;
    console.log(logMessage);
    logFile(logMessage);
};

const info = (message) => log("info", message);
const warn = (message) => log("warn", message);
const error = (message) => log("error", message);

export { info, warn, error };