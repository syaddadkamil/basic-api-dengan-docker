import moment from "moment";
import UserAgentParser from "user-agent-parser";

let requestCount = 0;

const metadataMiddleware = (req, res, next) => {
    try {
        requestCount++;

        const userAgent = req.headers["user-agent"];
        const parserUserAgent = new UserAgentParser(userAgent);
        const os = parserUserAgent.getOS(); 
        const osName = os && os.name ? os.name : "Unknown OS";
        const osVersion = os && os.version ? os.version : "Unknown OS Version";

        const metadata = {
            status: "200",
            message: "OK",
            timestamp: moment().format("YYYY-MM-DD | HH:mm:ss"),
            requestCount,
            getUrl: req.originalUrl,
            headers: {
                host: req.headers.host,
                connection: req.headers.connection,
                userAgent: userAgent,
                accept: req.headers.accept,
            },
            os: {
                OSname: osName,
                OSversion: osVersion
            },
        };

        res.json(metadata);
    } catch (error) {
        const statusCode = error.status || 500;
        const errorMessage = error.message || "Internal Server Error"; 

        const errorMetadata = {
            status: statusCode.toString(),
            message: errorMessage,
            timestamp: moment().format("YYYY-MM-DD | HH:mm:ss"),
            requestCount,
            getUrl: req.originalUrl,
            headers: {
                host: req.headers.host,
                connection: req.headers.connection,
                userAgent: req.headers["user-agent"],
                accept: req.headers.accept,
            },
            os: {
                OSname: "Unknown OS",
                OSversion: "Unknown OS Version"
            },
        };

        res.status(statusCode).json(errorMetadata);
    }
};

export default metadataMiddleware;
