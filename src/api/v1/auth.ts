import { Router } from "express";

import login from "../../controllers/auth/login"; 
import register from "../../controllers/auth/register";
import resendCode from "../../controllers/auth/resend";
import status from "../../controllers/auth/status";
import verify from "../../controllers/auth/verify";

const router = Router()
.post('/login', login)
.post('/register', register)
.post('/resend', resendCode)
.post('/status', status)
.post('/verify', verify)

export default router