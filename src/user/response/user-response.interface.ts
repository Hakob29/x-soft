import { Role } from "../user.entity"

export class UserResponseInterface {
    user: {
        username: string
        email: string
        role: Role[]
    }
}