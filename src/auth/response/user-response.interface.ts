import { Role } from "src/user/user.entity"

export interface UserResponseInterface {

    user: {
        readonly username: string

        readonly email: string

        readonly role: Role[]

    }

}