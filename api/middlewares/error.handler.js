//Middleware for handle the errors
function printErrors(err, req, res, next) {
    console.log('Error: '+err);
    next(err);
}

function boomErrorHandler(err, req, res, next) {
    if(err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    }else{
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        'statusCode': err.status ?? 500,
        'message': err.message ?? 'Internal server error not handled by Boom.',
        //'stack': err.stack ,
    });
}

module.exports = {printErrors, errorHandler, boomErrorHandler}