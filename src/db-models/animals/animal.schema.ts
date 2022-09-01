import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from '../../domain-models';

@Schema({ _id: false, autoCreate: false, discriminatorKey: 'kind'})
export class AnimalModel {
    @Prop({ type: String, required: true, enum: Object.values(AnimalKind) })
    kind!: AnimalKind;

    @Prop({ required: true })
    numberOfLegs!: number;
}

export const AnimalSchema = SchemaFactory.createForClass(AnimalModel);
