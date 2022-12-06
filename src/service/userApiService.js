import db from '../models/index';
import bcrypt from 'bcryptjs'

const generateHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash;
}

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
            include: { model: db.Group, attributes: ["id", "name", "description"] },
            raw: true,
            nest: true,
            order: [['id', 'DESC']]
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

const checkEmailExist = async (userEmail) => {
    let email = await db.User.findOne({
        where: { email: userEmail }
    })
    if (email) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let phone = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (phone) {
        return true;
    }
    return false;
}

const createNewUser = async (data) => {
    try {
        // validate
        let isEmailExist = await checkEmailExist(data.email)
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exists',
                EC: 1,
                DT: 'email'
            }
        }

        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'The phone is already exist',
                EC: 1,
                DT: 'phone'
            }
        }

        // hash password
        let hashPassword = generateHash(data.password)

        // create
        let user = await db.User.create(
            {
                ...data,
                password: hashPassword
            }
        )

        console.log("check user", user)

        return {
            EM: 'Create user ok',
            EC: 0,
            DT: user
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

const updateUser = async (data) => {
    try {
        if (!data.group) {
            return {
                EM: 'Group not empty...',
                EC: 2,
                DT: 'group'
            }
        }

        let user = await db.User.findOne({
            where: { id: data.id }
        })
        console.log("check user", user)
        console.log("check data : ", data)
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            })
            return {
                EM: 'Update user success',
                EC: 0,
                DT: user
            }
        } else {
            return {
                EM: 'Not found user',
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

module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination };