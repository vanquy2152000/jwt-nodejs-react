import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handlePageUser = async (req, res) => {
    let userList = await userService.getListUser()

    console.log("check users : ", userList)

    return res.render("user.ejs", { userList })
}

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;



    return res.send("create-new")
}

module.exports = {
    handleHelloWorld, handlePageUser, handleCreateUser
}