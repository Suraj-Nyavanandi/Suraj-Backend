import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UsersModule } from '../users/users.module';

// Auth module setup
@Module({
    imports: [
        PassportModule, // Integrate passport.js
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Secret for signing JWTs
            signOptions: { expiresIn: process.env.JWT_EXPIRY }, // Token expiration time
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema with Mongoose
        UsersModule, // Import Users module
    ],
    controllers: [AuthController], // Handle routes in AuthController
    providers: [AuthService, JwtStrategy], // Provide AuthService and JwtStrategy
})
export class AuthModule {}
