import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { Role } from "../user.entity"


export class UpdateUserDto {
    @IsEmail()
    old_email: string

    @IsString()
    @IsNotEmpty()
    @Length(4, 10)
    old_password: string

    @IsString()
    username: string

    @IsEmail()
    new_email: string

    @IsString()
    @IsNotEmpty()
    @Length(4, 10)
    new_password: string

}