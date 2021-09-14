const httpStatus = require('http-status');
const { apiLogger } = require('../logger/logger.service');

/**
 * Error handler
 * @public
 *
 */
const handler = async (err, req, res, next) => {

    apiLogger.error(
        'Error handled by middleware::', err
    );
    res.status(err.status);
    res.json(err);
    res.end();
};

exports.methodNotFound = async (req, res, next) => {
    const err = {
        message: "Method Not Allowed",
        status: httpStatus.METHOD_NOT_ALLOWED,
    };
    return handler(err, req, res);
};

exports.parametersNotFound = {
    status: 415,
    message: 'Pass the exact parameters in the body',
};

exports.notAuthorized = {
    status: 401,
    message: 'Unauthorized User',
};

exports.googleTokenVerificationFailed = {
    status: 401,
    message: 'Invalid token or Token expired',
};

exports.InternalServerError = {
    status: 500,
    message: 'Internal Server Error'
};
