const jwt = require('jsonwebtoken');
const { AUTH_API_SECRET, AUTH_API_ACCESS_KEY } = require("../../config/vars");
const { utilsLogger } = require('../logger/logger.service');


class AuthService {

    generateAuthToken = (req, res) => {
        try {
            const accessToken = req.headers['commarray-access-token'];
            if (accessToken !== AUTH_API_ACCESS_KEY) {
                return res.status(401).send({ 'error': 'Authorization error' })
            }
            const jwtToken = jwt.sign(
                {
                    tokenType: "authToken",
                },
                AUTH_API_SECRET,
                {expiresIn: "120000"}
            );
            return res.status(200).send({token: jwtToken});
        } catch (e) {
            utilsLogger.error("generateAuthToken:: Error in generating JWT TOKEN:: Error", e)
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
}

module.exports.AuthService = new AuthService()
