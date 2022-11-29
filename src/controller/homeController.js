import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handlePageUser = async (req, res) => {
    let userList = await userService.getListUser();
    
    return res.render("user.ejs", { userList })
}

const handleCreateUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username)

    return res.redirect("/user")
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)

    return res.redirect("/user")
}

module.exports = {
    handleHelloWorld, handlePageUser, handleCreateUser, handleDeleteUser
}