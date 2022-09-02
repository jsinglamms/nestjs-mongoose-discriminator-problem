import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from '../../domain-models';
import { AnimalModel } from './animal.schema';

@Schema({ _id: false, autoCreate: false })
export class WolfModel extends AnimalModel{
    @Prop({ required: true })
    canineLengthInCm!: number;

    kind!: AnimalKind.Wolf;
}

export const WolfSchema = SchemaFactory.createForClass(WolfModel);
