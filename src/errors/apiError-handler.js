class apiErrorHandler {
    notFound(req, res, next) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
    }

    errorHandler(err, req, res, next) {
        res.status(err.status || 500)
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            },
        })
    }
}

module.exports = new apiErrorHandler()
