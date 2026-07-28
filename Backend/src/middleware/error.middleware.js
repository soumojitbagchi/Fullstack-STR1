import dotenv from "dotenv/config";
function errorHandler(err, req, res, next) {
  const response = {
    error: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
  };

  if (process.env.ENVIRONMENT === "development") {
    res.stack = err.stack;
  }
  res.status(response.statusCode).json(response);
}

export default errorHandler;
