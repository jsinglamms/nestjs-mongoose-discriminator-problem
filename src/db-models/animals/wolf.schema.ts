import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from '../../domain-models';

@Schema({ _id: false, autoCreate: false })
export class WolfModel {
    @Prop({ required: true })
    canineLengthInCm!: number;

    kind!: AnimalKind.Wolf;
}

export const WolfSchema = SchemaFactory.createForClass(WolfModel);
