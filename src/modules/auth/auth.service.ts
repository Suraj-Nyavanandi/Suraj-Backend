import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../../dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, // Inject User model
        private jwtService: JwtService, // Inject JwtService for token creation
    ) {}

    async signup(authDto: AuthDto) {
        const { email, password } = authDto;

        // Check if the email already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, password: hashedPassword });
        await newUser.save();
        return { message: 'User registered successfully' };
    }

    async login(authDto: AuthDto) {
        const { email, password } = authDto;

        // Find user by email
        const user = await this.userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Invalid credentials');
        }

        // Create JWT token
        const payload = { sub: user._id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
}
