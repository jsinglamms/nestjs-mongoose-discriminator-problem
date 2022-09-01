import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ForestModel, ForestSchema } from "../db-models/forest.document";
import { WolfModel, WolfSchema } from "../db-models/animals/wolf.schema";
import { AnimalKind } from "../domain-models";
import { ForestController } from "./forest.controller";
import { AnimalModel, AnimalSchema } from "../db-models/animals/animal.schema";
import { HareModel, HareSchema } from "../db-models/animals/hare.schema";
import { UnicornModel, UnicornSchema } from "../db-models/animals/unicorn.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ForestModel.name, schema: ForestSchema },
            { name: AnimalModel.name, schema: AnimalSchema, discriminators: [
                {name: HareModel.name, schema: HareSchema, value: AnimalKind.Hare},
                {name: WolfModel.name, schema: WolfSchema, value: AnimalKind.Wolf},
                { name: UnicornModel.name, schema: UnicornSchema, value: AnimalKind.Unicorn},
            ]}
        ]),
    ],
    controllers: [ForestController],
})
export class ForestModule{}
