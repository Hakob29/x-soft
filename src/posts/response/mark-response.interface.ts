import { Model } from "../model.entity"


export interface MarkResponseInterface {

    mark: {
        name: string
        models: Model[]
    }
}