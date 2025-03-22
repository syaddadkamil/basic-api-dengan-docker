import moment from "moment";
let requestCount = 0;

const formatUptime = (uptime) => {
  const seconds = Math.floor(uptime % 60);
  const minutes = Math.floor((uptime / 60) % 60);
  const hours = Math.floor((uptime / 3600) % 24);
  return `${hours}H ${minutes}M ${seconds}S`;
};

const statusMiddleware = (req, res, next) => {
    try {
        requestCount++;
        const UptimeSeconds = process.uptime();

        const status = {
            status: "200",
            message: "OK",
            uptime: formatUptime(UptimeSeconds),
            timestamp: moment().format("YYYY-MM-DD | HH:mm:ss"),
            requestCount,
            getUrl: req.originalUrl,
            
        };

        res.json(status);
    } catch (error) {
        const statusCode = error.status || 500;
        const errorMessage = error.message || "Internal Server Error"; 

        const errorMetadata = {
            status: statusCode.toString(),
            message: errorMessage,
            uptime: formatUptime(UptimeSeconds),
            timestamp: moment().format("YYYY-MM-DD | HH:mm:ss"),
            requestCount,
            getUrl: req.originalUrl,
            
        };

        res.status(statusCode).json(errorMetadata);
    }
};

export default statusMiddleware;