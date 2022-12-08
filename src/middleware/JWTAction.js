import jwt from 'jsonwebtoken';
require("dotenv").config();

const nonSecurePaths = ['/', '/register', '/login'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null

    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN },)
    } catch (e) {
        console.log("check error: ", e)
    }
    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null

    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        console.log("check error :", e)
    }
    return decoded;
}

// Check nguoi dung da dang nhap hay chua
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = verifyToken(token)

        if (decoded) {
            req.user = decoded
            req.token = token
            next();
        } else {
            return res.status(401).json({
                EM: "Not authenticate the user",
                EC: -1,
                DT: ''
            })
        }

    } else {
        return res.status(401).json({
            EM: "Not authenticate the user",
            EC: -1,
            DT: ''
        })
    }
}

//check quyen cua user
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    console.log("req path ", req.path);
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.group.Roles;
        let currentPath = req.path;

        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EM: `You don't permission to access this resource`,
                EC: -1,
                DT: ''
            })
        }

        let canAccess = roles.some(item => item.url === currentPath);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: `You don't permission to access this resource`,
                EC: -1,
                DT: ''
            })
        }

    } else {
        return res.status(403).json({
            EM: `You don't permission to access this resource`,
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}