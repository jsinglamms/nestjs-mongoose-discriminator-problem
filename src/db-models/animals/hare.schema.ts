import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from '../../domain-models';


@Schema({ _id: false, autoCreate: false })
export class HareModel {
    @Prop({ type: [String] })
    mostAppreciatedVegetables!: string[];

    kind!: AnimalKind.Hare;
}

export const HareSchema = SchemaFactory.createForClass(HareModel);
