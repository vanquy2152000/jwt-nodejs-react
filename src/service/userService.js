import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

const HashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync("B4c0/\/", salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = HashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (err) {
        console.log("check err : ", err)
    }
}

const getListUser = async () => {
    let users = []
    users = await db.User.findAll()
    return users;
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
}

const getUserById = async (id) => {
    let user = {}
    user = await db.User.findOne({
        where: {
            id: id
        }
    })

    user = user.get({ plain: true })

    return user;

}
const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: { id: id }
        }
    );
}

module.exports = {
    createNewUser, getListUser, deleteUser, getUserById, updateUserInfor
}