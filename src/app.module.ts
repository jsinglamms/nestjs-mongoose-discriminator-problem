import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InMemoryMongoService } from './in-memory-mongo/in-memory-mongo.service';
import { InMemoryMongoModule } from './in-memory-mongo/in-memory-mongo.module';
import { ForestModule } from './forest/forest.module';

@Module({
    imports: [
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
        ForestModule,
    ],
    providers: [InMemoryMongoService],
})
export class AppModule {}
