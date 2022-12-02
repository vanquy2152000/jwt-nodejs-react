const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        name: 'tobi'
    })
}

const handleRegister = (req, res) => {
    console.log("check register : ", req.body)
}

module.exports = {
    testApi, handleRegister
}