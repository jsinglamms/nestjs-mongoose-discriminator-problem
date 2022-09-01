import { MongooseModule } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { AnimalsUnion, ForestModel } from "../db-models";
import { AnimalKind } from "../domain-models";
import { ForestModule } from "./forest.module";
import { InMemoryMongoModule } from "../in-memory-mongo/in-memory-mongo.module";
import { InMemoryMongoService } from "../in-memory-mongo/in-memory-mongo.service";
import { ForestService } from "./forest.service";
import { WolfModel } from "src/db-models/animals/wolf.schema";
import { AnimalModel } from "src/db-models/animals/animal.schema";

describe('CatsService', () => {
    let subject: ForestService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {
                    module: ForestModule,
                    providers: [
                        ForestService
                    ]
                },
                MongooseModule.forRootAsync({
                    useFactory: async (mongoInMemory: InMemoryMongoService) => {
                        const connString = await mongoInMemory.getMongoConnString();
                        return {
                            uri: connString,
                        };
                    },
                    inject: [InMemoryMongoService],
                    imports: [InMemoryMongoModule],
                }),
            ],
        }).compile();

        subject = module.get<ForestService>(ForestService);
    });

    it('should be defined', () => {
        expect(subject).toBeDefined();
    });

    it('Load Data and works', async ()=>{
        const insertedData : ForestModel = {
            name: 'blabla',
            animals: [
                {
                    kind: AnimalKind.Wolf,
                    canineLengthInCm: 10,
                    numberOfLegs: 4
                },
                {
                    kind: AnimalKind.Unicorn,
                    hornColor: "white",
                    numberOfLegs: 5
                }
            ],
        }
        await subject.insertData(insertedData)

        const dbData = await subject.loadData()

        expect(dbData).toHaveLength(1)
        expect(dbData[0]).toEqual(insertedData)
    })

    it('Load data should not work, because of missing data in the non-discriminated part', async ()=>{
        const wolf: WolfModel = {
            kind: AnimalKind.Wolf,
            canineLengthInCm: 15,
        }
        const insertedData: ForestModel = {
            name: 'forest with problems',
            animals: [
                wolf as AnimalsUnion
            ]
        }

        await expect(subject.insertData(insertedData)).rejects.toThrowError()
    })

    it('Load data should not work, because of missing data in the discriminated part', async ()=>{
        const wolf: AnimalModel = {
            kind: AnimalKind.Wolf,
            numberOfLegs: 4
        }
        const insertedData: ForestModel = {
            name: 'forest with problems',
            animals: [
                wolf as AnimalsUnion
            ]
        }

        await expect(subject.insertData(insertedData)).rejects.toThrowError()
    })
})
