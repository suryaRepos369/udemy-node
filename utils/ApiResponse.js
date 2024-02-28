class ApiResponse extends Response {
    constructor(statusCode, message, data){
        super();
        this.data = data
        this.statusCode = statusCode;
        this.message = message
    }
}

module.exports = ApiResponse;