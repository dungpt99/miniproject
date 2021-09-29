const jwt = require('jsonwebtoken')

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(' ')[1]
    if (!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        req.user = data
        if (err) return res.sendStatus(403)
        next()
    })
}

module.exports = authenToken
