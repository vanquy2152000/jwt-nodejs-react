import roleApiService from '../service/roleApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit

            let data = await roleApiService.getRoleWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await roleApiService.getAllRoles();

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

        let data = await roleApiService.createNewRoles(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log("check e", e)
        return res.status(500).json({
            EM: 'error from service',
            EC: -2,
            DT: ''
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await roleApiService.updateRole(req.body)
        console.log(data)
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

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id)

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

const getUserAccount = (req, res) => {
    return res.status(200).json({
        EM: 'ok',
        EC: 0,
        DT: {
            access_Token: req.token,
            groupWithRoles: req.user.group,
            email: req.user.email,
            username: req.user.username,
        }
    })
}

const getRolesByGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        let data = await roleApiService.getRoleByGroup(id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log('check error', e)
        return res.status(500).json({
            EM: 'error from server',
            EC: -2,
            DT: []
        })
    }
}

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log('check error', e)
        return res.status(500).json({
            EM: 'error from server',
            EC: -2,
            DT: []
        })
    }
}


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount, getRolesByGroup, assignRoleToGroup
}