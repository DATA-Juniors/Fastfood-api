import { Router } from "express";
import authRoutes from "./auth"
import usersRoutes from "./users"
import category  from "./category"
import products  from "./products"

const router = Router()
.use('/auth',     authRoutes)
.use('/users',    usersRoutes)
.use('/category', category)
.use('/products', products)

export default router