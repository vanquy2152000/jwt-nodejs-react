import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handlePageUser)
    router.post("/user/create-user", homeController.handleCreateUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    return app.use("/", router)

}
export default initWebRoutes;