import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class DeleteUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @Length(4, 10)
    @IsNotEmpty()
    password: string
}