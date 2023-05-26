import { IsNumber, IsString } from "class-validator"


export class UpdateModelDto {

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    year: number

    @IsNumber()
    engine: number

    @IsString()
    color: string
}