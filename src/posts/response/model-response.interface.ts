import { Mark } from "../mark.entity"

export interface ModelResponseInterface {

    model: {
        name: string

        price: number

        year: number

        engine: number

        color: string

        mark: Mark | string

    }
}