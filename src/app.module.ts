import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
        DatabaseConfig, // MongoDB connection setup
        AuthModule, // Import AuthModule for authentication
    ],
})
export class AppModule {}
