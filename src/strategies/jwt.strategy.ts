import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// Strategy for validating JWTs
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
            secretOrKey: process.env.JWT_SECRET, // Use secret from environment variable
        });
    }

    // Validate and decode the JWT payload
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email }; // Attach user info to the request object
    }
}
