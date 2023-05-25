import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { Role } from "src/user/user.entity"

export class RegisterUserDto {

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(4, 10)
    password: string

    @IsOptional()
    role: Role[]

}