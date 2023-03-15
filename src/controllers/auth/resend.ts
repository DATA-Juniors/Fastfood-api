import { Request, Response } from "express";
import { ResendDto } from "../../models/auth/resend";
import { createVerification } from "../../services/verification.service";
import { getTimeOut, verifyCode } from "../../utils/functions";
import { sendEmail } from "../../services/mail.service";
import { findUserByEmail } from "../../services/user.service";

export default async (req: Request, res: Response) => {
    const body: ResendDto = req.body
    const user = await findUserByEmail(body.email)
    if(user == null) {
        return res.status(500).json({
            message: "User not found"
        })
    }
    if(user.role != "none") {
        return res.status(404).json({
            message: "account already verified!"
        })
    }
    const code = verifyCode()
    const verification = await createVerification(code, user.email)
    if(verification == null) {
        return res.status(401).json({
            message: "verification null"
        })
    }
    await sendEmail(user.email, code)
    const timeOut = +process.env.TIME_OUT!
    console.log("Time out: "+ getTimeOut(verification.created_at, timeOut))
    return res.status(400).json({
        message: `Code sent to email ${user.email}`,
        timeOut: timeOut,
        verificationId: verification.id
    })
}