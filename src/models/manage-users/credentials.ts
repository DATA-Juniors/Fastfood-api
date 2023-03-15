import { Role } from "../auth/user";

export interface CredentialDto {
    password: string,
    role: Role
}