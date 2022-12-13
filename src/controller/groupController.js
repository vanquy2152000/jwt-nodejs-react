import groupService from '../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroup();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log("check error controler ", e)
        return res.status(500).json({
            EM: "Error from server...",
            EC: "-2",
            DT: []
        })
    }
}

module.exports = {
    readFunc
}