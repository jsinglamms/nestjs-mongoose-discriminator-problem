import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class InMemoryMongoService implements OnApplicationShutdown {

    constructor(@Inject('MONGO_IN_MEMORY') readonly mongodb: MongoMemoryServer) {}

    public async getMongoConnString(): Promise<string> {
        return this.mongodb.getUri();
    }

    public async onApplicationShutdown(): Promise<void> {
        await this.mongodb.cleanup();
        await this.mongodb.stop();
    }
}
