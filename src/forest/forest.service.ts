import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ForestDocument, ForestModel } from "../db-models";

@Injectable()
export class ForestService {
    constructor(@InjectModel(ForestModel.name) private readonly forestModel: Model<ForestDocument>){}

    async insertData(forest: ForestModel){
        await this.forestModel.insertMany(forest)
    }

    loadData(){
        return this.forestModel.find({}, {__v: 0, _id: 0}).lean()
    }
}
