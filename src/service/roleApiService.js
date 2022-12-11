import db from '../models/index';

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true
        })

        let persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: 'Nothing to create....',
                EC: 0,
                DT: []
            }
        }

        await db.Role.bulkCreate(persists);

        return {
            EM: `Create roles succeeds : ${persists.length}....`,
            EC: 0,
            DT: []
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles
}