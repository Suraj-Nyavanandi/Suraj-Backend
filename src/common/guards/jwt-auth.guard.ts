import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard to protect routes with JWT strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
