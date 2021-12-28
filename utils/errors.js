class ValidatonError extends Error {}

const handleError = (err,req,res, next) => {
    if (err instanceof ValidatonError) {
        res
            .status(err instanceof ValidatonError ? 400 : 500)
            .render('error', {
              message: err instanceof ValidatonError ? err.message : 'Please try again later'
            })
    }


}

module.exports = {
    handleError,
    ValidatonError
}