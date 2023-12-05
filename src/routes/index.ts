import { Router } from "express";
import userRoute from './user.route'
import artistRoute from './artist.route'

const routes = Router()

routes.use('/user', userRoute)
routes.use('/artist', artistRoute)

export default routes