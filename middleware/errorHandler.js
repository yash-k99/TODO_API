const {customAPIError} = require('../errors/customError');

const errorHandler = (err,req,res,next) => {
    if(err instanceof customAPIError){
        return res.status(err.statuscode).json(err.message);
    }
    return res.status(500).json(err.message);
}

module.exports = errorHandler;