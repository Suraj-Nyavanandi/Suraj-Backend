import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../../dtos/auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth') // Route prefix for all auth-related endpoints
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup') // Endpoint for user registration
    async signup(@Body() authDto: AuthDto) {
        return this.authService.signup(authDto); // Delegate logic to AuthService
    }

    @Post('login') // Endpoint for user login
    async login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto); // Delegate logic to AuthService
    }

    @Get('dashboard') // Protected route
    @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
    getDashboard() {
        return { message: 'Welcome to the dashboard!' };
    }
}
