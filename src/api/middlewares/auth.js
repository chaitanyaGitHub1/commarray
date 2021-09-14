const jwt = require('jsonwebtoken');
const { JWT_SECRET, AUTH_API_SECRET } = require('../../config/vars');
const JwtToken = require('./jwtToken');

const AUTHERROR = {
    statusCode: 401,
    message: 'Authorization Fields Not Provided',
};

const TOKENEXPIRE = {
    statusCode: 401,
    message: 'Token Expired',
};

const REFRESHTOKEN = {
    statusCode: 200,
    message: 'Please pass the refresh token',
};

module.exports.verifyAccessToken = async (req, res, next) => {
    if (req.headers.authorization) {
        let bearerToken = req.headers.authorization;
        bearerToken = bearerToken.slice(7);
        jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(200)
                    .send(TOKENEXPIRE);
            }
            req.id = decoded.id;
            req.role = decoded.role;
            return next();
        });
    } else {
        return res.status(401)
            .send(AUTHERROR);
    }
};

module.exports.verifyRefreshToken = async (req, res) => {
    if (req.headers.authorization) {
        let bearerToken = req.headers.authorization;
        bearerToken = bearerToken.slice(7);
        jwt.verify(bearerToken, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(200)
                    .send(TOKENEXPIRE);
            }
            req.id = decoded.id;
            req.role = decoded.role;
            req.tokenType = decoded.tokenType;
            if (req.tokenType === 'refresh') {
                const accessToken = await new JwtToken(req.id, req.role).generateJwtAccessToken();
                return res.status(200).send({
                    accessToken: accessToken
                });
            }
            return res.status(401)
                .send(REFRESHTOKEN);
        });
    } else {
        return res.status(401)
            .send(AUTHERROR);
    }
};

module.exports.verifyAuthToken = async (req, res, next) => {
    console.log(req.ip);
    if (req.headers.authorization) {
        let bearerToken = req.headers.authorization;
        bearerToken = bearerToken.slice(7);
        jwt.verify(bearerToken, AUTH_API_SECRET, (err, decoded) => {
            if (err) {
                return res.status(200)
                    .send(TOKENEXPIRE);
            }
            if (decoded) {
                return next();
            }
            return res.status(401)
                .send(REFRESHTOKEN);
        });
    } else {
        return res.status(401)
            .send(AUTHERROR);
    }
}
