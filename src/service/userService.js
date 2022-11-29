import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const HashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync("B4c0/\/", salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = HashUserPassword(password);

    connection.query(
        'INSERT INTO users (email,password,username) VALUES(?,?,?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log(results);
        }
    );
}

const getListUser = async () => {
    let users = []
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * from users ');
        return rows
    } catch (err) {
        console.log("check err : ", err)
    }
}

module.exports = {
    createNewUser, getListUser
}