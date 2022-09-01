class customAPIError extends Error {
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

const createCustomAPIError = (message, statuscode) => {
    return new customAPIError(message, statuscode);
};

module.exports = {
    createCustomAPIError,
    customAPIError
};