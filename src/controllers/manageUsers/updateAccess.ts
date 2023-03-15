import { Request, Response } from "express";
import { CredentialDto } from "../../models/manage-users/credentials";
import { changeUserCredentials } from "../../services/manageUsers.service";
import CredentialSchema from "../../validation/manage-users/credential.schema";

export default async (req: Request, res: Response) => {
    const id: any = req.params.id
    const data: CredentialDto = req.body
    const user = res.locals.user
    const { error } = CredentialSchema.validate(req.body)
    if(error) {
        return res.status(401).json({
            error: error.details[0].message
        })
    }
    await changeUserCredentials(data.password, data.role, id)
    res.status(200).json({
        message: "User access credentials updated",
        user: {
                id: id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                birthday: user.birthday,
                phone: user.phone,
                role: data.role
            }
    })
}