import { Router } from "express";
import userRoute from './user.route'
import artistRoute from './artist.route'
import musicTrackRoute from './music-track.route'

const routes = Router()

routes.use('/user', userRoute)
routes.use('/artist', artistRoute)
routes.use('/music-track', musicTrackRoute)

export default routes