import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from '../../domain-models';

@Schema({ _id: false, autoCreate: false })
export class UnicornModel {
    @Prop({ required: true })
    hornColor!: string;

    kind!: AnimalKind.Unicorn;
}

export const UnicornSchema = SchemaFactory.createForClass(UnicornModel);
