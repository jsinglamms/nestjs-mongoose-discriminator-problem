import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AnimalsUnion, ForestDocument, ForestModel } from "../db-models";
import { AnimalModel } from "../db-models/animals/animal.schema";

@Injectable()
export class ForestService {
    constructor(
        @InjectModel(ForestModel.name) private readonly forestModel: Model<ForestDocument>,
        @InjectModel(AnimalModel.name) private readonly animalModel: Model<AnimalModel>,
    ){}

    async insertData(forest: ForestModel){
        await this.forestModel.insertMany(forest)
    }

    loadData(){
        return this.forestModel.find({}, {__v: 0, _id: 0}).lean()
    }

    async insertAnimal(animal: AnimalsUnion){
        await this.animalModel.insertMany(animal)
    }
}
