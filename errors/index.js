const statusCodes = require("http").STATUS_CODES;

class HttpError extends Error {
  constructor(httpCode, message) {
    super(message);
    if (!httpCode || httpCode < 400) {
      this.httpCode = 500;
    } else {
      this.httpCode = httpCode;
    }
    this.message = message || statusCodes[this.httpCode];
  }
}

module.exports = HttpError;
