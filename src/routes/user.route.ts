import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = Router()
const userController = new UserController()

routes.post('/register', userController.register)

export default routes