import { Request, Response } from "express"
import { LoginDto } from "../../models/auth/login"
import { findUserByEmail } from "../../services/user.service"
import { User } from "../../models/auth/user"
import LoginSchema from "../../validation/auth/login.schema"

export default async (req: Request, res: Response) => {
    try {
        const {error} = LoginSchema.validate(req.body, {abortEarly: true})
        if (error) {
            return res.status(401).json({
                message: error.details[0].message
            })}
        const loginDto: LoginDto = req.body
        const isExists: User | null = await findUserByEmail(loginDto.email)

        if(isExists == null) {
            return res.status(400).json({
                message: `User with email ${loginDto.email} is not registered`
            })
        }
        if(loginDto.password != isExists?.password) {
            return res.status(404).json({
                message: "Email or password is wrong"
            })
        }
        res.status(200).json({
            message: "Successfully logged in",
            user: {
                name: isExists?.name,
                surname: isExists?.surname,
                email: isExists?.email,
                birthday: isExists?.birthday,
                phone: isExists?.phone
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}