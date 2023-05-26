import { Posts } from "src/posts/posts.entity"
import { Role } from "../user.entity"

export class UserResponseInterface {
    user: {
        username: string
        email: string
        role: Role[]
        posts: Posts[]
    }
}