import db from '../models/index';

const getAllUser = async (data) => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "phone", "username", "address", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            raw: true,
            nest: true
        });
        if (users) {
            return {
                EM: "Get data success",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get data not success",
                EC: -1,
                DT: []
            }
        }

    } catch (e) {
        console.log("check e service", e);
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "email", "phone", "username", "address", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            raw: true,
            nest: true,
        });

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log("check e service", e);
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

const createUser = async (data) => {
    try {
        let user = await db.User.create({

        })

    } catch (e) {
        console.log("check e service", e);
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        }

    } catch (e) {
        console.log("check e service", e);
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

const deleteUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist...',
                EC: 1,
                DT: []
            }
        }

    } catch (e) {
        console.log("check e service", e);
        return {
            EM: 'Error from service....',
            EC: -2,
            DT: []
        }
    }
}

module.exports = { getAllUser, createUser, updateUser, deleteUser, getUserWithPagination };