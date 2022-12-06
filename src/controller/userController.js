import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit

            let data = await userApiService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })

        }

    } catch (e) {
        console.log("check Err server: ", e)
        return res.status(500).json({
            EM: "Error from server...",
            EC: -2,
            DT: []
        })
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body)

        console.log("check data create : ", data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: '',
            EC: -2,
            DT: []
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser()

    } catch (e) {
        return res.status(500).json({
            EM: '',
            EC: -2,
            DT: []
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
    readFunc, createFunc, updateFunc, deleteFunc
}