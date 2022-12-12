import db from '../models/index';

const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            order: [["id", "DESC"]],
            raw: true
        })
        console.log("get all")
        if (roles) {
            return {
                EM: "Get data success",
                EC: 0,
                DT: roles
            }
        } else {
            return {
                EM: "Get data not success",
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        return {
            EM: "error from service...",
            EC: -2,
            DT: []
        }
    }
}

const getRoleWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "url", "description"],
            raw: true,
            order: [['id', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit)

        const data = {
            totalRows: count,
            totalPages: totalPages,
            roles: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }

    } catch (e) {
        return {
            EM: "error from service...",
            EC: -2,
            DT: []
        }
    }
}

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true
        })

        let persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));

        // Check da ton tai
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create because role already exists....',
                EC: 1,
                DT: []
            }
        }

        let role = await db.Role.bulkCreate(persists);

        return {
            EM: `Create roles succeeds : ${persists.length}....`,
            EC: 0,
            DT: role
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

const updateRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: { id: data.id }
        })
        console.log("check role", role)
        if (role) {
            await role.update({
                url: data.url,
                description: data.description,
            })
            return {
                EM: 'Update role success...',
                EC: 0,
                DT: role
            }
        } else {
            return {
                EM: 'Not found role',
                EC: 1,
                DT: []
            }
        }
    } catch (e) {
        return {
            EM: 'Error from service...',
            EC: -2,
            DT: []
        }
    }
}

const deleteRole = async (id) => {
    console.log("check delete se:", id)
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        console.log("check role : ", role)
        if (role) {
            await role.destroy();
            return {
                EM: "Delete user success",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Role not exist...',
                EC: 1,
                DT: []
            }
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
    createNewRoles, getAllRoles, getRoleWithPagination, deleteRole, updateRole,
}