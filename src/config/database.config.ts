import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// Configure and connect to MongoDB using environment variables
export const DatabaseConfig = MongooseModule.forRoot(process.env.MONGO_URI);
