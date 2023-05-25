import { IsEmail, IsString, Length } from "class-validator"


export class RestoreUserDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(4, 10)
    password: string
}