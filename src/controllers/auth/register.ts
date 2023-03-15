import { Request, Response } from "express";
import { User } from "../../models/auth/user";
import { createUser, findUserByEmail } from "../../services/user.service";
import { RegisterDto } from "../../models/auth/register";
import { sendEmail } from "../../services/mail.service";
import { verifyCode } from "../../utils/functions";
import { cleanVerification, createVerification } from "../../services/verification.service";
import RegisterSchema from "../../validation/auth/register.schema";

export default async (req: Request, res: Response) => {
    try {
        const code = verifyCode()
        const { error } = RegisterSchema.validate(req.body, {abortEarly: true})
        if(error) {
            return res.status(401).json({
                error: error.details[0].message
            })
        }
        const bodyDto: RegisterDto = req.body;
        const userByEmail: User | null = await findUserByEmail(bodyDto.email)
        if(userByEmail != null) {
            return res.status(400).json({
                message: "User with email aready exists"
            })
        }
        const verification = await createVerification(code, bodyDto.email)
        console.log("Verification:", verification)
        if(verification == null) {
            return res.status(500).json({
                message: "Cannot save verification"
            })
        }
        await sendEmail(bodyDto.email, code)
        const user = await createUser(bodyDto);
        res.status(200).json({
            message: "Verification code sent",
            email: user.email,
            verificationId: verification.id,
            timeOut: process.env.TIME_OUT
        })
        const deleteUser = cleanVerification(+process.env.TIME_OUT!)
        console.log("Delete user: " + deleteUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

console.log(verifyCode())