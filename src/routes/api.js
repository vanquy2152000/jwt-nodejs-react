import express from 'express';
import apiController from '../controller/apiController'
import userController from '../controller/userController'
import groupController from '../controller/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

let router = express.Router();

const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission);

    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    //log out
    router.post("/logout", apiController.handleLogout)
    // Luu account user vao jwt
    router.get("/account", userController.getUserAccount)
    // rest api
    // CRUD - Create, Read, Update, Delete
    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)

    router.get('/group/read', groupController.readFunc)

    return app.use("/api/v1", router)

}
export default initApiRoutes;