import db from '../models/index';

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']],
        }
        );

        return {
            EM: "fetch group ok",
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log("check e service", e)
        return {
            EM: 'Error from service....',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    getGroup
}