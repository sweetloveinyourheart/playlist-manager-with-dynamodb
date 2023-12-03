import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = Router()
const userController = new UserController()

routes.post('/register', userController.register)
routes.post('/sign-in', userController.login)
routes.get('/profile', userController.getUserProfile)
routes.get('/refresh-token', userController.refreshToken)

export default routes