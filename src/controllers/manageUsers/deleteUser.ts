import { Request, Response } from "express";
import { deleteUser, deleteUserWithVerification } from "../../services/manageUsers.service";

export default async (req: Request, res: Response) => {
    const id: any = req.params.id
    const user = await deleteUser(id)
    await deleteUserWithVerification(id)
    if(user == null) {
        return res.status(400).json({
            message: `user with id=${id} is not in database`
        })
    }
    res.status(200).json({
        message: `User with id ${id} deleted`,
        user: {
            id: id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            phone: user.phone,
            role: user.role
            }
    })
}