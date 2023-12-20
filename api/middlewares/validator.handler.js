function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const {error} = schema.validate((data), { abortEarly: true });
        if(error){
            console.log('Error validating the request data schema');
            next(error);
        }else{
            console.log('Validation passed');
            next();
        }
    };
}

module.exports = validatorHandler;