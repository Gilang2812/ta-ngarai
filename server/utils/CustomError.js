class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  class CustomBulkError extends Error {
    constructor(messages, statusCode) {
        // Ensure messages is an object (not array or string)
        if (typeof messages !== 'object' || Array.isArray(messages)) {
            throw new Error("Messages should be an object with key-value pairs.");
        }
        
        super(); // Call the parent constructor with no message
  
        // Store the messages and status code
        this.messages = messages;
        this.statusCode = statusCode;
    }
  
    // Method to get the formatted error response
    getResponse() {
        return {
            error: this.messages, // Format the error as an object of messages
            statusCode: this.statusCode
        };
    }
}  
  module.exports = {CustomError,CustomBulkError};
  