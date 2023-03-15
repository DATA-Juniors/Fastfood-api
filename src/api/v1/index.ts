import { Router } from "express";
import authRoutes from "./auth"
import usersRoutes from "./users"
import category  from "./category"

const router = Router()
.use('/auth',     authRoutes)
.use('/users',    usersRoutes)
.use('/category', category)

export default router