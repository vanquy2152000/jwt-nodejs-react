import db from '../models/index'
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

const generateHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash;
}

const comparePassword = (password, hash) => {

    let result = bcrypt.compareSync(password, hash)
    if (result) {
        console.log("Password correct");
    } else {
        console.log("Password wrong");
    }
    return result
}
// console.log(comparePassword("1234", "$2a$10$IOB1TCeSReGQGjBhA5JQlOFf4SO/gMBCXreJg2vQD8mNnu6jpw486"))


const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }

    return false;
}

const registerNewUser = async (rawUserData) => {
    try {

        // validata check email,phone exist
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'The Phone is already exist',
                EC: 1
            }
        }

        // hash password
        let hashpassword = generateHash(rawUserData.password)
        // create new user

        let user = await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashpassword,
            phone: rawUserData.phone,
        })
        let data = user.get({ plain: true })

        return {
            EM: "A user is created successfully",
            EC: 0,
            DT: data
        }
    } catch (e) {
        return {
            EM: 'Something wrong in service....',
            EC: -2
        }
    }
}

const loginUser = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            },
        })

        if (user) {
            let data = user.get({ plain: true })
            let isCorrectPassword = comparePassword(rawData.password, user.password)

            if (isCorrectPassword === true) {

                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: data
                }
            }
        }

        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: '1',
            DT: ''
        }


    } catch (error) {
        console.log("checkkkkkk: ", error)
        return {
            EM: 'Something wrong in service....',
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser, loginUser
}