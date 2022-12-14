import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        name: 'tobi'
    })
}

const handleRegister = async (req, res) => {
    try {
        // validate
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', // error message
                EC: '1', // error Code
                DT: '' // data
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters', // error message
                EC: '1', // error Code
                DT: ''
            })
        }

        // service : create new user
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            data: data.DT
        })

    } catch (e) {
        console.log("check e", e)
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.loginUser(req.body)

        // set cookie
        if (data && data.DT && data.DT.access_Token) {
            res.cookie("jwt", data.DT.access_Token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            data: data.DT
        })

    } catch (error) {
        console.log("check error :  ", error)
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogout = async (req, res) => {
    try {
        await res.clearCookie("jwt");

        return res.status(200).json({
            EM: 'clear cookie done',
            EC: 0,
            DT: ''
        })

    } catch (e) {
        return res.status(500).json({
            EM: '',
            EC: -2,
            DT: []
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
}