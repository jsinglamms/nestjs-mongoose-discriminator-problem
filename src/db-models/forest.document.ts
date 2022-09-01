import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalModel, AnimalSchema } from './animals/animal.schema';
import { HareModel } from './animals/hare.schema';
import { UnicornModel } from './animals/unicorn.schema';
import { WolfModel } from './animals/wolf.schema';

export type AnimalsUnion = (WolfModel | HareModel | UnicornModel) & AnimalModel

@Schema()
export class ForestModel {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, type: [AnimalSchema] })
    animals!: AnimalsUnion[];
}

export const ForestSchema = SchemaFactory.createForClass(ForestModel);

export type ForestDocument = ForestModel & Document;
