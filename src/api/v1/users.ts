import { Router } from "express";
import allUsers from "../../controllers/manageUsers/allUsers";
import deleteUsers from "../../controllers/manageUsers/deleteUser";
import updateUserDetails from "../../controllers/manageUsers/updateDetails";
import updateAccess from "../../controllers/manageUsers/updateAccess";
import authorization from "../../middleware/user";

const router = Router()

.use(authorization)
.get('/', allUsers)
.delete('/:id', deleteUsers)
.put('/:id/details', updateUserDetails)
.put('/:id/access', updateAccess)

export default router;