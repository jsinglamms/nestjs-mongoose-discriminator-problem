import { Module } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { InMemoryMongoService } from './in-memory-mongo.service';

@Module({
    providers: [InMemoryMongoService, {
        provide: "MONGO_IN_MEMORY",
        useFactory: async ()=>await MongoMemoryServer.create()
    }],
    exports: [InMemoryMongoService],
})
export class InMemoryMongoModule {}
