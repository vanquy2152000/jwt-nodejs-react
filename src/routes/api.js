import express from 'express';
import apiController from '../controller/apiController'
import userController from '../controller/userController'
import groupController from '../controller/groupController'

let router = express.Router();

const initApiRoutes = (app) => {
    //test api
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

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