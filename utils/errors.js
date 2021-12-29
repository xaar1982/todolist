class ValidationError extends Error {}

function handleError (err,req,res, next) {
    if (err instanceof ValidationError) {
        res
            .status(err instanceof ValidationError ? 400 : 500)
            .render('error', {
              message: err instanceof ValidationError ? err.message : 'Please try again later'
            })
        return false;
    }
}

module.exports = {
    handleError,
    ValidationError
}