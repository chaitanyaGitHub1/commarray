const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/vars");

class JwtToken {

    constructor(id, role) {
        this.id = id;
        this.role = role;
    }

    async generateLoginAccessToken() {
        return {
            accessToken: await this.generateJwtAccessToken(),
            refreshToken: await this.generateJwtRefreshToken()
        }
    }

    async generateJwtAccessToken() {
        return jwt.sign(
            {
                id: this.id,
                role: this.role,
                tokenType: "access",
            },
            JWT_SECRET,
            // { expiresIn: "300000" }
            {expiresIn: "300000"}
        );
    }

    async generateJwtRefreshToken() {
        return jwt.sign(
            {
                id: this.id,
                role: this.role,
                tokenType: "refresh",
            },
            JWT_SECRET,
            {expiresIn: "24h"}
        );
    }
}

module.exports = JwtToken;
