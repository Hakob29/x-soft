import { IsNumber, IsString } from "class-validator"


export class AddModelDto {

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

    @IsString()
    mark: string

}