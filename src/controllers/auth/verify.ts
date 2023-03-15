import { Request, Response } from "express";
import { VerificationDto } from "../../models/auth/verification";
import { findVerificationById } from "../../services/verification.service";
import { getTimeOut } from "../../utils/functions";
import { findUserByEmail, updateUser } from "../../services/user.service";
import md5 from "md5";
import VerifySchema from "../../validation/auth/verify.schema";

export default async (req: Request, res: Response) => {
    try {
        const {error} = VerifySchema.validate(req.body)
        const bodyDto: VerificationDto = req.body
        if(error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        console.log('find verification');

        const verification = await findVerificationById(bodyDto.verificationId)
        if(verification == null) {
            return res.status(400).json({
                message: "Verification not found"
            })
        }

        console.log('find user');

        const user = await findUserByEmail(verification.email)

        console.log('timeout'); 

        if(user == null) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const timeOut = getTimeOut(verification.created_at, +process.env.TIME_OUT!)
        if(timeOut <= 0) {
            return res.status(400).json({
                message: "Verification code is expired, please resend code",
                verificationId: verification.id,
            })
        }
        if(verification.code != bodyDto.code) {
            return res.status(400).json({
                message: "Wrong verification code!"
            })
        }
        if(verification.id != bodyDto.verificationId) {
            return res.status(400).json({
                message: "Wrong verification id!"
            })
        }
        if(user.role == "user") {
            return res.status(400).json({
                message: "User already verified!"
            })
        }
        console.log('update user');

        const is_confirmed: boolean = true
        const token = md5(user?.email + "." + user?.password + "." + process.env.SECRET_KEY)
        const updatedUser = await updateUser("admin", token, is_confirmed, user.id)
        res.status(200).json({
            message: "Successfuly register",
            user: {
                id: user?.id,
                email: updatedUser.email,
                name: updatedUser.name,
                surname: updatedUser.surname,
                birthday: updatedUser.birthday,
                phone: updatedUser.phone,
                role: updatedUser.role
            },
            token
        })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}