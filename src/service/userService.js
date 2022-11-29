import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const HashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync("B4c0/\/", salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = HashUserPassword(password);

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('INSERT INTO user (email,password,username) VALUES(?,?,?)', [email, hashPass, username]);
        return rows
    } catch (err) {
        console.log("check err : ", err)
    }
}

const getListUser = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * from user ');
        return rows
    } catch (err) {
        console.log("check err : ", err)
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows
    } catch (err) {
        console.log("check err : ", err)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
        return rows
    } catch (err) {
        console.log("check err : ", err)
    }
}
// ;

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute(`UPDATE user SET email = ?, username= ? WHERE id = ? `, [email, username, id]);
        return rows
    } catch (err) {
        console.log("check err dasd : ", err)
    }
}

module.exports = {
    createNewUser, getListUser, deleteUser, getUserById, updateUserInfor
}