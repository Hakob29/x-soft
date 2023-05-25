import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterUserDto {

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(4, 10)
    password: string

}